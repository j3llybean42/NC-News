import { useState, useRef } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSearchParams } from "react-router-dom";

export default function ArticleSort({ topics }) {
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false)
  const topicAnchorRef = useRef(null);
  const sortAnchorRef = useRef(null)
  const [selectedTopic, setSelectedTopic] = useState("All Topics")
  const [selectedSort, setSelectedSort] = useState("Sort By")
  const [searchParams, setSearchParams] = useSearchParams()


  function handleTopicToggle() {
    setIsTopicOpen((prevTopicOpen) => !prevTopicOpen);
  }

  function handleTopicClick(topic) {
    setIsTopicOpen(false);
    setSelectedTopic(topic)
    setSearchParams({ topic: topic})
  }

  function handleAllTopics(){
    setSearchParams(searchParams.delete("topic"))
  }

  function handleTopicClose(event) {
    setIsTopicOpen(false)
  }

  function handleSortToggle(){
    setIsSortOpen((prevSortOpen) => !prevSortOpen);
  }

  function handleSortClick(value) {
    const queries = value.split(" ")
    setIsSortOpen(false)
    setSelectedSort(value)
    setSearchParams({ sort_by: queries[0], order: queries[1]})
  }

  function handleDefaultSort(){
    setSearchParams(searchParams.delete("sort_by"))
    setSearchParams(searchParams.delete("order"))
  }

  function handleSortClose(){
    setIsSortOpen(false)
  }

  return (
    <>
      <ButtonGroup
        color="inherit"
        ref={topicAnchorRef}
        aria-label="topics button group"
      >
        <Button size="small" onClick={handleAllTopics}>All topics</Button>
        <Button
          size="small"
          aria-controls={isTopicOpen ? "split-button-menu" : undefined}
          aria-expanded={isTopicOpen ? "true" : undefined}
          aria-label="select topic"
          aria-haspopup="menu"
          onClick={handleTopicToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        <Popper
          sx={{ zIndex: 1 }}
          open={isTopicOpen}
          anchorEl={topicAnchorRef.current}
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
                <ClickAwayListener onClickAway={handleTopicClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {topics.map((topic) => (
                      <MenuItem
                        key={topic.slug}
                        selected={topic.slug === selectedTopic}
                        onClick={() => handleTopicClick(topic.slug)}
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
      <ButtonGroup
        color="inherit"
        ref={sortAnchorRef}
        aria-label="sort by button group"
      >
        <Button size="small" onClick={handleDefaultSort}>Sort By:</Button>
        <Button
          size="small"
          aria-controls={isSortOpen ? "split-button-menu" : undefined}
          aria-expanded={isSortOpen ? "true" : undefined}
          aria-label="select topic"
          aria-haspopup="menu"
          onClick={handleSortToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        <Popper
          sx={{ zIndex: 1 }}
          open={isSortOpen}
          anchorEl={sortAnchorRef.current}
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
                <ClickAwayListener onClickAway={handleSortClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                      <MenuItem
                        key={"created_at desc"}
                        selected={"created_at desc" === selectedSort}
                        onClick={() => handleSortClick("created_at desc")}
                      >
                        Date (Newest first)
                      </MenuItem>
                      <MenuItem
                        key={"created_at asc"}
                        selected={"created_at asc" === selectedSort}
                        onClick={() => handleSortClick("created_at asc")}
                      >
                        Date (Oldest first)
                      </MenuItem>
                      <MenuItem
                        key={"comment_count asc"}
                        selected={"comment_count asc" === selectedSort}
                        onClick={() => handleSortClick("comment_count asc")}
                      >
                        No. of Comments {<ArrowUpwardIcon/>}
                      </MenuItem>
                      <MenuItem
                        key={"comment_count desc"}
                        selected={"comment_count desc" === selectedSort}
                        onClick={() => handleSortClick("comment_count desc")}
                      >
                        No. of Comments {<ArrowDownwardIcon/>}
                      </MenuItem>
                      <MenuItem
                        key={"votes asc"}
                        selected={"votes asc" === selectedSort}
                        onClick={() => handleSortClick("votes asc")}
                      >
                        Votes {<ArrowUpwardIcon/>}
                      </MenuItem>
                      <MenuItem
                        key={"votes desc"}
                        selected={"votes desc" === selectedSort}
                        onClick={() => handleSortClick("votes desc")}
                      >
                        Votes {<ArrowDownwardIcon/>}
                      </MenuItem>
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
