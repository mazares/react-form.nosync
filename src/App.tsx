import "./App.css";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@example.com",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const errorStyle = {
    background: "linear-gradient(135deg, #ea0f0f,  #e69b0f)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "this email is already taken",
      });
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="on"
          {...register("email")}
          type="text"
          placeholder="email"
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        <input
          autoComplete="on"
          {...register("password")}
          type="password"
          placeholder="password"
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        <button disabled={isSubmitting} type="submit" className="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {errors.root && <p style={errorStyle}>{errors.root.message}</p>}
      </form>

      <article>
        <p>
          This is a demo of using zod with react-hook-form. The form has two
          fields: email and password. The email field must be a valid email
          address and the password field must be at least 8 characters long.
        </p>
      </article>
    </div>
  );
}

export default App;
