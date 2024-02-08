import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getTopics } from "../utils";

export default function TopicSelect({ topics, setTopics}) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    getTopics().then((data) => {
      const { topics } = data;
      setTopics(topics);
    });
  });

  function handleToggle() {
    setIsOpen((prevOpen) => !prevOpen)
  }

  function handleItemClick(topic) {
    setIsOpen(false)
    navigate(`/articles?topic=${topic}`)
  }

  function handleClose(event) {
    setIsOpen(false)
  }

  return (
    <>
      <ButtonGroup
        color="inherit"
        ref={anchorRef}
        aria-label="Button group with nested menu"
      >
        <Button size="small" href="/topics">
          Topics
        </Button>
        <Button
          size="small"
          aria-controls={isOpen ? "split-button-menu" : undefined}
          aria-expanded={isOpen ? "true" : undefined}
          aria-label="select topic"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        <Popper
          sx={{ zIndex: 1 }}
          open={isOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {topics.map((topic, index) => (
                      <MenuItem
                        key={topic.slug}
                        selected={index === selectedIndex}
                        onClick={() => handleItemClick(topic.slug)}
                      >
                        {topic.slug}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
    </>
  );
}
