
import notesRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/users.routes";

app.use(usersRoutes);
app.use(notesRoutes);

export default app;