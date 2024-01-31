import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState("");

  useEffect(() => {
    // Fetch todo data based on the id
    // and update the todo state
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/todos/${id}`);
        const data = await response.json();
        setTodo(data.todo);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Update the todo on the server
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });

      // Redirect back to the todos list
      router.push("/todos");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={todo} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTodoPage;
