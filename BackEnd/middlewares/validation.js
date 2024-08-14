export const validateUser = (req, res, next) => {
  const { email, username, password_sec, age } = req.body;
  if (!email || !username || !password_sec || !age) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  password_sec.length < 6
    ? res.status(400).send("La contraseña debe tener al menos 6 caracteres")
    : null;

  email.contains("@")
    ? res.status(400).send("El correo electrónico no es válido")
    : null;

  email.contains(".").send("El correo electrónico no es válido");

  next();
};
