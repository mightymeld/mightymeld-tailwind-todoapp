import { useMemo, useState } from "react";

const TASKS = [
  {
    "id": 1,
    "name": "Clone welcome project",
    "done": true
  },
  {
    "id": 2,
    "name": "Add MightyMeld instance ID",
    "done": true
  },
  {
    "id": 3,
    "name": "Learn to use MightyMeld",
    "done": false
  }
]

export default function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [newTaskName, setNewTaskName] = useState("");
  const [filter, setFilter] = useState("all");

  const toggleDone = (id: number) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskName === "") return;
    setTasks((tasks) => [
      ...tasks,
      { id: tasks.length + 1, name: newTaskName, done: false },
    ]);
    setNewTaskName("");
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.done);
      case 'done':
        return tasks.filter(task => task.done);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <>
      <div className="box-border min-h-screen bg-[#EEE] p-10">
        <h1 className="text-center text-[40px]"
          style={{
            fontFamily: "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        > My Tasks</h1>
        <div className="flex justify-between gap-4">
          <div className="relative w-full bg-white">
            <input
              type="text"
              id="filled_success"
              aria-describedby="filled_success_help"
              value={newTaskName}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-white border-0 border-b border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#17a5ea] peer"
              placeholder=" "
            />
            <label
              htmlFor="filled_success"
              className="absolute text-sm text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-focus:text-[#17a5ea] peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              What needs to be done?
            </label>
          </div>
          <button
            className="bg-[#17a5ea] hover:bg-[#1182bb] rounded shadow-md py-2 px-4 uppercase"
            onClick={() => addTask()}
          >
            Add
          </button>
        </div>
        <nav className="mt-8 mb-3 rounded inline-flex flex-row justify-between border bg-white divide-x">
          {["all", "active", "done"].map((item, i) => (
            <button
              key={i}
              className={`px-[17px] py-[9px] uppercase text-sm ${filter === item ? "background-blue text-[#17a5ea] " : ""
                }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <ul className="flex flex-col gap-2">
          {filteredTasks.map((task) => {
            const labelId = `checkbox-list-label-${task.id}`;
            return (
              <li
                key={task.id}
                className=" bg-white px-4 py-[15px] rounded-md hover:bg-neutral-100 "
              >
                <div className="flex gap-7 items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    className="mr-2 custom-checkbox"
                  />
                  <label
                    htmlFor={labelId}
                    className={`text-sm ${task.done ? "line-through" : ""}`}
                  >
                    {task.name}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="pt-10">
          <hr style={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
          <p className="text-[#bdbdbd] text-center text-xs my-2 ">Made with love in MightyMeld</p>
        </div>
      </div>
    </>
  );
}
