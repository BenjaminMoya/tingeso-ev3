import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import userService from "../services/user.service";

const UserInformation = () => {
  const [creditInit] = useState(JSON.parse(sessionStorage.getItem("toEvaluate")));
  const [userSelected,setUserSelected] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const navigate = useNavigate();

  const init = () => {
    userService
    .getById(creditInit.creditUserId)
    .then((response) => {
      console.log("Usuario encontrado: ", response.data);
      setUserSelected(response.data);
    })
    .catch((e) => {
      console.log("Ha ocurrido un error al obtener el usuario" , e);
    });
  }

  const editBalance = (e) => {
    e.preventDefault();
    if(userBalance < 0){
      alert("El saldo no puede ser negativo");
      return;
    }

    const user = { userId:userSelected.userId, userName:userSelected.userName, userRut:userSelected.userRut, userEmail:userSelected.userEmail, userPassword:userSelected.userPassword, userAge:userSelected.userAge, userAccountSeniority:userSelected.userAccountSeniority, userWorkSeniority:userSelected.userWorkSeniority, userSavingCapacity:userSelected.userSavingCapacity, userBalance:userBalance, userIndependent:userSelected.userIndependent, executive:userSelected.executive };

    userService
    .update(user)
    .then((response) => {
      console.log("Saldo actualizado: ", response.data);
      navigate("/credit/evaluation");
    })
    .catch((e) => {
      console.log("Ha ocurrido un error al actualizar el saldo" , e);
    });
  }

  useEffect(() => {
    init();
  }, []);

  if(userSelected != null){
    return (
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
        >
          <h3> Datos del usuario </h3>
          <form>
            <p> Nombre: {userSelected.userName} </p>
            <p> Rut: {userSelected.userRut} </p>
            <p> Email: {userSelected.userEmail} </p>
            <p> Edad: {userSelected.userAge} </p>
            <p> Antiguedad de cuenta: {userSelected.userAccountSeniority} </p>
            <p> Antiguedad laboral: {userSelected.userWorkSeniority} </p>
            <p> Saldo: {userSelected.userBalance} </p>
            <FormControl>
              <TextField
                id="userBalance"
                label="Saldo"
                value={userBalance}
                variant="standard"
                type="number"
                onChange={(e) => setUserBalance(e.target.value)}
                helperText="Moneda local(CLP)"
              />
            </FormControl>
            <FormControl>
              <br />
    
              <Button
                variant="contained"
                color="info"
                onClick={(e) => editBalance(e)}
                style={{ marginLeft: "0.5rem" }}
              >
                Editar saldo
              </Button>
            </FormControl>
          </form>
        </Box>
    );
  } else {
    <h3>Cargando datos...</h3>
  }
};

export default UserInformation;
