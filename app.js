sequelize.sync({ alter: true }) // Para que adapte tablas sin borrarlas
  .then(() => {
    console.log('✅ Base de datos conectada');
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  });
