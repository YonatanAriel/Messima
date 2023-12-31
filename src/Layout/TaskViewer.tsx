import { useEffect, useState } from "react"
import { getAllTasks } from "../functions/services/task.service"
import { useSearchParams } from "react-router-dom"
import ListView from "../components/ListView"

export default function TaskViewer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tagFilter = searchParams.get("tags") || ``
  const [tasks, setTasks] = useState<Task[]>([])
  const [refresher, refresh] = useState(true)

  useEffect(() => {
    getAllTasks().then((res: Task[]) => {
      res.sort((a, b) => Number(b.done) - Number(a.done))
      if (tagFilter !== ``) {
        res = res.filter((task) => task.tags.includes(tagFilter))
      }
      setTasks(res)
    })
  }, [refresher, tagFilter, searchParams])

  return (
    <>
      <span
        onClick={() => {
          setSearchParams({})
        }}
        className="w-fit cursor-pointer rounded-md bg-slate-700 px-2 hover:bg-slate-900"
      >
        {tagFilter}
      </span>
      <ListView refresh={refresh} tasks={tasks} />
    </>
  )
}
