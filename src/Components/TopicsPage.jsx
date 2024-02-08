import TopicCard from "./TopicCard"

export default function TopicsPage({topics}) {
    return (
        <section>
            <h2>Topics</h2>
                {topics.map((topic) => {
                    return <TopicCard key={topic.slug} topic={topic}/>
                })}
        </section>
    )
}