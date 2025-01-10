const Home = () => {
  return (
    <div style={{
      color: "black", 
    }}>
  <h1>PrestaBanco: Sistema de gestion de prestamos y creditos hipotecarios</h1>
  <p>
    PrestaBanco es una aplicación web para solicitar y gestionar prestamos y
    creditos hipotecarios. Esta aplicación ha sido desarrollada usando
    tecnologías como{" "}
    <a href="https://spring.io/projects/spring-boot" style={{ color: "#215a6d" }}>Spring Boot</a> (para el
    backend), <a href="https://reactjs.org/" style={{ color: "#215a6d" }}>React</a> (para el Frontend) y{" "}
    <a href="https://www.postgresql.org/" style={{ color: "#215a6d" }}>PostgreSQL</a> (para la base de
    datos).
  </p>
</div>

    
  );
};

export default Home;
