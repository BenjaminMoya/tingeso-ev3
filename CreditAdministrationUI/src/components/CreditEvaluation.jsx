import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import CalculateIcon from "@mui/icons-material/Calculate";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import SavingsSharpIcon from '@mui/icons-material/SavingsSharp';
import Typography from "@mui/material/Typography";
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import userService from "../services/user.service";
import creditService from "../services/credit.service";
import Tooltip from "@mui/material/Tooltip";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import EventIcon from '@mui/icons-material/Event';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoIcon from '@mui/icons-material/Info';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"
import savingCapacityService from "../services/savingCapacity.service";
import fileService from "../services/file.service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CreditEvaluation = () => {

  const creditInit = JSON.parse(sessionStorage.getItem("toEvaluate"));
  const [creditId] = useState(creditInit.creditId);
  const [creditUserId] = useState(creditInit.creditUserId);
  const [creditPropertyAmount] = useState(creditInit.creditPropertyAmount);
  const [creditRequestedAmount] = useState(creditInit.creditRequestedAmount);
  const [creditTerm] = useState(creditInit.creditTerm);
  const [creditFirmDate,setCreditFirmDate] = useState(creditInit.creditFirmDate);
  const [creditType] = useState(creditInit.creditType);
  const [creditReason, setCreditReason] = useState("");
  const [interest, setInterest] = useState("");
  const [monthlyEntry, setMonthlyEntry] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [allDebts, setAllDebts] = useState("");
  const [topRetirement, setTopRetirement] = useState("");
  const [relationCI, setRelationCI] = useState("");
  const [relationDI, setRelationDI] = useState("");
  const [savingCapacity, setSavingCapacity] = useState("");
  const [age,setAge] = useState("");
  const [executive,setExecutive] = useState("");
  const [workSeniority,setWorkSeniority] = useState("");
  const [indepedent,setIndependent] = useState("");
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const today = new Date();
  const firmDate = new Date(creditFirmDate);
  const formatDate = firmDate.toISOString().split('T')[0];
  const [options, setOptions] = useState({
    greatRetirement: false,
    periodicDeposits: false,
  });
  const navigate = useNavigate();
  
  const init = () => {

    userService
    .getById(sessionStorage.getItem("userId"))
    .then((response) => {
      console.log("Mostrando datos del usuario.", response.data);
      setCreditReason(creditInit.creditReason);
      setAge(response.data.userAge);
      setExecutive(response.data.executive);
      setWorkSeniority(response.data.userWorkSeniority);
      setIndependent(response.data.userIndependent);
    })
    .catch((error) => {
      console.log(
        "Ha ocurrido un error al intentar obtener el estado de ejecutivo.",
        error
      );
    });
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; 
  };

  const handleDateChange = (date) => {
    setCreditFirmDate(date);
  };

  useEffect(() => {
    init();
  }, []);

  const handleFileChange1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };

  const handleClickOpen1 = () => {
    setOpen1(true); 
  };

  const handleCancel1 = () => {
    setOpen1(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm1 = (e) => {
    approve(e);
    setOpen1(false); 
    console.log("Acción confirmada");
  };

  const handleClickOpen2 = () => {
    setOpen2(true); 
  };

  const handleCancel2 = () => {
    setOpen2(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm2 = (e) => {
    reject(e);
    setOpen2(false); 
    console.log("Acción confirmada");
  };

  const handleClickOpen3 = () => {
    setOpen3(true); 
  };

  const handleCancel3 = () => {
    setOpen3(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm3 = (e) => {
    accept(e);
    setOpen3(false); 
    console.log("Acción confirmada");
  };

  const handleClickOpen4 = () => {
    setOpen4(true); 
  };

  const handleCancel4 = () => {
    setOpen4(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm4 = (e) => {
    cancel(e);
    setOpen4(false); 
    console.log("Acción confirmada");
  };

  const handleClickOpen5 = () => {
    setOpen5(true); 
  };

  const handleCancel5 = () => {
    setOpen5(false); 
    console.log("Acción cancelada");
  };

  const handleClickOpen6 = () => {
    setOpen6(true); 
  };

  const handleCancel6 = () => {
    setOpen6(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm6 = (e) => {
    setOpen6(false);
    contract(e);
    console.log("Acción confirmada");
  };

  const handleClickOpen7 = () => {
    setOpen7(true); 
  };

  const handleCancel7 = () => {
    setOpen7(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm7 = (e) => {
    setOpen7(false);
    finalAccept(e);
    console.log("Acción confirmada");
  };

  const handleClickOpen8 = () => {
    setOpen8(true); 
  };

  const handleCancel8 = () => {
    setOpen8(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm8 = (e) => {
    setOpen8(false);
    cancel(e);
    console.log("Acción confirmada");
  };

  const handleClickOpen9 = () => {
    setOpen9(true); 
  };

  const handleCancel9 = () => {
    setOpen9(false); 
    console.log("Acción cancelada");
  };

  const handleConfirm9 = (e) => {
    setOpen9(false);
    transfer(e);
    console.log("Acción confirmada");
  };

  
  const ev1 = () => {
    if(creditType == 1){
      if(creditTerm <= 30){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      }
    } else if(creditType == 2){
      if(creditTerm <= 20){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      }
    } else if(creditType == 3){
      if(creditTerm <= 25){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      }
    } else{
      if(creditTerm <= 15){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Plazo:{creditTerm} años</Typography>
          </Box>
        )
      }
    }
  }

  const ev2 = () => {
    if(creditType == 1){
      if(creditRequestedAmount <= creditPropertyAmount*0.8){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      }
    } else if(creditType == 2){
      if(creditRequestedAmount <= creditPropertyAmount*0.7){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      }
    } else if(creditType == 3){
      if(creditRequestedAmount <= creditPropertyAmount*0.6){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      }
    } else{
      if(creditRequestedAmount <= creditPropertyAmount*0.5){
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      } else {
        return (
          <Box display="flex" alignItems="row" mb={1}>
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography>Monto: ${creditRequestedAmount} (CLP)</Typography>
          </Box>
        )
      }
    }
  }

  const ev3 = () => {

    if(interest == "" || interest <= 0){
      return alert("El interes debe ser un numero positivo");
    }

    if(monthlyEntry == "" || monthlyEntry <= 0 || monthlyEntry%1 != 0){
      return alert("La cuota mensual debe ser un numero entero positivo");
    }

    if(creditType == 1 && (interest < 3.5 || interest > 5)){
      return alert("El interes debe estar entre 3.5% y 5%");
    } else if(creditType == 2 && (interest < 4 || interest > 6)){
      return alert("El interes debe estar entre 4% y 6%");
    } else if(creditType == 3 && (interest < 5 || interest > 7)){
      return alert("El interes debe estar entre 5% y 7%");
    } else if(creditType == 4 && (interest < 4.5 || interest > 6)){
      return alert("El interes debe estar entre 4.5% y 6%");
    }

    creditService
    .relation1(creditRequestedAmount,interest,creditTerm,monthlyEntry)
    .then((response) => {
      console.log("Relacion CI: ", response.data);
      alert("Relacion CI calculada");
      setRelationCI(response.data);
    })
    .catch((error) => {
      console.log(
        "Ha ocurrido un error al intentar obtener la relacion CI.",
        error
      );
    });
  };

  const ev4 = () => {

    if(interest == "" || interest <= 0){
      return alert("El interes debe ser un numero positivo");
    }

    if(monthlyEntry == "" || monthlyEntry <= 0 || monthlyEntry%1 != 0 || allDebts == "" || allDebts <= 0 || allDebts%1 != 0){
      return alert("La cuota mensual y las deudas mensuales deben ser un numero entero positivo");
    }

    creditService
    .simulation(creditRequestedAmount,interest,creditTerm)
    .then((response) => {
      console.log("Cuota mensual simulada: ", response.data);
      creditService
      .relation2(monthlyEntry,allDebts,response.data)
      .then((response) => {
        console.log("Relacion DI: ", response.data);
        alert("Relacion DI calculada");
        setRelationDI(response.data);
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar obtener la relacion DI.",
          error
        );
      });
    })
    .catch((error) => {
      console.log(
        "Ha ocurrido un error al intentar obtener la cuota mensual.",
        error
      );
    });
  };

  const ev5 = () => {
    if(age+creditTerm <= 75){
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.checked,
    });
  };

  const ev6 = () => {

    if(monthlyDeposit == "" || monthlyDeposit <= 0 || monthlyDeposit%1 != 0 || topRetirement == "" || topRetirement <= 0 || topRetirement%1 != 0){
      return alert("El deposito mensual y el retiro maximo deben ser un numero entero positivo");
    }
    
    userService
    .zero(creditUserId)
    .then((response) => {
      console.log("Reinicio de condicion de ahorro: ", response.data);
      savingCapacityService
      .min(creditUserId,creditRequestedAmount)
      .then((response) => {
        console.log("Condicion de saldo minimo: ", response.data);
        savingCapacityService
        .history(creditUserId,options.greatRetirement)
        .then((response) => {
          console.log("Condicion de retiros significativos: ", response.data);
          savingCapacityService
          .periodic(creditUserId,monthlyDeposit,monthlyEntry,options.periodicDeposits)
          .then((response) => {
            console.log("Condicion de depositos periodicos: ", response.data);
            savingCapacityService
            .relation(creditUserId,creditRequestedAmount)
            .then((response) => {
              console.log("Condicion de relacion saldo/antiguedad: ", response.data);
              savingCapacityService
              .out(creditUserId,topRetirement)
              .then((response) => {
                console.log("Condicion de retiros maximos: ", response.data);
                userService
                .getById(creditUserId)
                .then((response) => {
                  console.log("Mostrando datos del usuario.", response.data);
                  alert("Capacidad de ahorro: "+response.data.userSavingCapacity);
                  setSavingCapacity(response.data.userSavingCapacity);
                })
                .catch((error) => {
                  console.log(
                    "Ha ocurrido un error al intentar obtener la capacidad de ahorro.",
                    error
                  );
                });
              })
              .catch((error) => {
                console.log(
                  "Ha ocurrido un error al intentar obtener la condicion de retiros maximos.",
                  error
                );
              });
            })
            .catch((error) => {
              console.log(
              "Ha ocurrido un error al intentar obtener la condicion de relacion saldo/antiguedad.",
              error
              );
            });
          })
          .catch((error) => {
            console.log(
              "Ha ocurrido un error al intentar obtener la condicion de depositos periodicos.",
              error
            );
          });
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar obtener la condicion de retiros significativos.",
            error
          );
        });
      })
      .catch((error) => {
        console.log(
        "Ha ocurrido un error al intentar obtener la condicion de saldo minimo.",
        error
        );
      });
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar reiniciar la condicion de ahorro.", 
        error
      );
    });
  };

  const approve = (e) => {
    e.preventDefault();
    
    if(savingCapacity == 0 || savingCapacity == -1 || interest == 0 || interest == -1 || monthlyEntry == 0 || monthlyEntry == -1 || monthlyDeposit == 0 || monthlyDeposit == -1 || allDebts == 0 || allDebts == -1 || topRetirement == 0 || topRetirement == -1 || relationCI == 0 || relationCI == -1 || relationDI == 0 || relationDI == -1){
      alert("Debe completar todas las evaluaciones");
      return;
    }

    creditService
    .monthly(creditRequestedAmount,interest,creditTerm)
    .then((response) => {
      console.log("Cuota mensual: ", response.data);
      const credit = { creditId, creditUserId, creditPropertyAmount:creditInit.creditPropertyAmount, creditRequestedAmount, creditProposedAmount:response.data, creditPhase:4 ,creditTerm, creditFirmDate, creditType, creditReason};
      creditService
      .update(credit)
      .then((response) => {
        console.log("El credito ha sido aprobado.", response.data);
        navigate("/credit/list");
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar aprobar el credito.",
          error
        );
      });
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar obtener la cuota mensual.", error);
    });
  };

  const reject = (e) => {
    e.preventDefault();
    
    if (creditReason == "" || creditReason == null) {
      return alert("Debe ingresar una razon para rechazar el credito");
    }

    const credit = { creditId, creditUserId, creditPropertyAmount, creditRequestedAmount, creditPhase:7 ,creditTerm, creditFirmDate, creditType, creditReason};
    creditService
    .update(credit)
    .then((response) => {
      console.log("El credito ha sido rechazado.", response.data);
      navigate("/credit/list");
    })
    .catch((error) => {
      console.log(
        "Ha ocurrido un error al intentar aprobar el credito.",
        error
      );
    });
  };

  const accept = (e) => {
    e.preventDefault();

    const credit = { creditId, creditUserId, creditPropertyAmount:creditInit.creditPropertyAmount, creditRequestedAmount, creditProposedAmount:creditInit.creditProposedAmount, creditPhase:5 ,creditTerm, creditFirmDate, creditType, creditReason:creditInit.creditReason};
    creditService
    .update(credit)
    .then((response) => {
      console.log("El credito ha sido aprobado.", response.data);
      navigate("/user/credits");
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar aprobar el credito.", error);
    });
  };

  const cancel = (e) => {
    e.preventDefault();

    creditService
    .deleteCredit(creditId)
    .then((response) => {
      console.log("El credito ha sido cancelado.", response.data);
      fileService
      .deleteFiles(creditId)
      .then((response) => {
        console.log("Los archivos han sido eliminados.", response.data);
        navigate("/user/credits");
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar eliminar los archivos.", error);
      });
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar cancelar el credito.", error);
    });
  };

  const contract = (e) => {
    e.preventDefault();

    if(creditFirmDate == "" || creditFirmDate == null || creditFirmDate < today){
      return alert("La fecha de firma debe ser posterior a la fecha actual");
    }

    if(selectedFile1 == null){
      return alert("Debe subir el contrato");
    }

    const credit = { creditId, creditUserId, creditPropertyAmount:creditInit.creditPropertyAmount, creditRequestedAmount, creditProposedAmount:creditInit.creditProposedAmount, creditPhase:6 ,creditTerm, creditFirmDate:formatDate, creditType, creditReason:creditInit.creditReason};

    creditService
    .update(credit)
    .then((response) => {
      console.log("El credito ha sido aprobado.", response.data);
      fileService
      .upload(creditId,8,selectedFile1)
      .then((response) => {
        console.log("El contrato ha sido subido.", response.data);
        navigate("/user/credits");
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar subir el contrato.", error);
      });
      navigate("/credit/list");
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar aprobar el credito.", error);
    });
  };

  const finalAccept = (e) => {
    e.preventDefault();

    const credit = { creditId, creditUserId, creditPropertyAmount:creditInit.creditPropertyAmount, creditRequestedAmount, creditProposedAmount:creditInit.creditProposedAmount, creditPhase:9 ,creditTerm, creditFirmDate, creditType, creditReason:creditInit.creditReason};

    creditService
    .update(credit)
    .then((response) => {
      console.log("El credito ha sido aprobado.", response.data);
      navigate("/user/credits");
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar aprobar el credito.", error);
    });
  };

  const transfer = (e) => {
    e.preventDefault();

    const credit = { creditId, creditUserId, creditPropertyAmount:creditInit.creditPropertyAmount, creditRequestedAmount, creditProposedAmount:creditInit.creditProposedAmount, creditPhase:0 ,creditTerm, creditFirmDate, creditType, creditReason:creditInit.creditReason};
    userService
    .transfer(creditUserId,creditId)
    .then((response) => {
      console.log("El credito ha sido transferido.", response.data);
      creditService
      .update(credit)
      .then((response) => {
        console.log("El credito ha sido completado.", response.data);
        navigate("/credit/list");
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar aprobar el credito.",
          error
        );
      });

    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar transferir el credito.", error);
    });
  }

  const download = (e) => {
    e.preventDefault();

    if (cooldown) {
      alert('Debes esperar 10 segundos para volver a descargar los archivos.');
      return;
    }

    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, 10000);

    if(creditType == 1){
      fileService
      .download(creditId,1)
      .then(() => {
        console.log("Descargando documento 1.");
        fileService
        .download(creditId,2)
        .then(() => {
          console.log("Descargando documento 2.");
          fileService
          .download(creditId,3)
          .then(() => {
            console.log("Descargando documento 3.");
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al intentar descargar el documento.", error);
          })
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar descargar el documento.", error);
        })
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar descargar el documento.", error);
      });
    } else if(creditType == 2){
      fileService
      .download(creditId,1)
      .then(() => {
        console.log("Descargando documento.");
        fileService
        .download(creditId,2)
        .then(() => {
          console.log("Descargando documento.");
          fileService
          .download(creditId,4)
          .then(() => {
            console.log("Descargando documento.");
            fileService
            .download(creditId,3)
            .then(() => {
              console.log("Descargando documento.");
            })
            .catch((error) => {
              console.log("Ha ocurrido un error al intentar descargar el documento.", error);
            })
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al intentar descargar el documento.", error);
          })
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar descargar el documento.", error);
        })
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar descargar el documento.", error);
      });
    } else if(creditType == 3){
      fileService
      .download(creditId,5)
      .then(() => {
        console.log("Descargando documento.");
        fileService
        .download(creditId,1)
        .then(() => {
          console.log("Descargando documento.");
          fileService
          .download(creditId,2)
          .then(() => {
            console.log("Descargando documento.");
            fileService
            .download(creditId,6)
            .then(() => {
              console.log("Descargando documento.");
            })
            .catch((error) => {
              console.log("Ha ocurrido un error al intentar descargar el documento.", error);
            })
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al intentar descargar el documento.", error);
          })
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar descargar el documento.", error);
        })
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar descargar el documento.", error);
      });
    } else if(creditType == 4){
      fileService
      .download(creditId,1)
      .then(() => {
        console.log("Descargando documento.");
        fileService
        .download(creditId,7)
        .then(() => {
          console.log("Descargando documento.");
          fileService
          .download(creditId,8)
          .then(() => {
            console.log("Descargando documento.");
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al intentar descargar el documento.", error);
          })
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar descargar el documento.", error);
        })
      })
      .catch((error) => {
        console.log("Ha ocurrido un error al intentar descargar el documento.", error);
      });
    }
  }

  const downloadContract = (e) => {
    e.preventDefault();
    if (cooldown) {
      alert('Debes esperar 10 segundos para volver a descargar el archivo.');
      return;
    }

    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, 10000);

    fileService
    .download(creditId,8)
    .then(() => {
      console.log("Descargando documento.");
    })
    .catch((error) => {
      console.log("Ha ocurrido un error al intentar descargar el documento.", error);
    });
  }

  const toInfoUser = () => {
    navigate("/user/information");
  }

  if(executive && creditInit.creditPhase == 3){
    return (
      <div>
        <Dialog
        open={open1}
        onClose={handleCancel1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se tomará como confirmado y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel1} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm1} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleCancel2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se rechazara y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel2} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm2} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
        <br />
        <div>
          <Box display="flex" alignItems="row" mb={1}>
            <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
            <Typography style={{ color:"#2d2d29" }}>Cumple con el requisito</Typography>
          </Box>
          <Box display="flex" alignItems="row" mb={1}>
            <RemoveRedEyeSharpIcon style={{ color: 'yellow', marginRight: 8 }} />
            <Typography style={{ color:"#2d2d29" }}>Requiere criterio del ejecutivo</Typography>
          </Box>
          <Box display="flex" alignItems="row">
            <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
            <Typography style={{ color:"#2d2d29" }}>No cumple con el requisito</Typography>
          </Box>
        </div>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
        >
          <h3 style={{ color:"#2d2d29" }}> Datos del credito </h3>
          <form>
          <Button
                variant="contained"
                color="info"
                onClick={() => toInfoUser()}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<InfoIcon />}
              >
                Informacion del usuario
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => download(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<CloudDownloadIcon />}
              >
                Descarga de archivos
              </Button>
            {creditType== 1 && (
              <p style={{ color:"#2d2d29" }}> Tipo de credito: Primera vivienda </p>
            )}
            {creditType== 2 && (
              <p style={{ color:"#2d2d29" }}> Tipo de credito: Segunda vivienda </p>
            )}
            {creditType== 3 && (
              <p style={{ color:"#2d2d29" }}> Tipo de credito: Propiedad comercial </p>
            )}
            {creditType== 4 && (
              <p style={{ color:"#2d2d29" }}> Tipo de credito: Remodelacion </p>
            )}
            <p style={{ color:"#2d2d29" }}> {ev1()} </p>
            <p style={{ color:"#2d2d29" }}> {ev2()} </p>
            { ev5() && (
              <Box display="flex" alignItems="row" mb={1}>
                <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Termina de pagar antes de los 75 años de edad o menos </Typography>
              </Box>
            )}
            { !ev5() && (
              <Box display="flex" alignItems="row" mb={1}>
                <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>El pago del credito se extiende a mas de 75 años de edad</Typography>
              </Box>
            )}
            {relationCI != 0 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Relacion CI menor a 35 %</Typography>
              </Box>
            )}
            { relationCI == 0 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Relacion CI mayor a 35%</Typography>
              </Box>
            )}
            { indepedent && (
              <Box display="flex" alignItems="row" mb={1}>
                <RemoveRedEyeSharpIcon style={{ color: 'yellow', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Independiente: Requiere revisar ingresos de los ultimos 2 años</Typography>
              </Box>
            )}
            { !indepedent && workSeniority >= 1 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Mas de 1 año de antiguedad laboral</Typography>
              </Box>
            )}
            { relationDI != 0 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Relacion DI: Deudas menores que el 50% del ingreso mensual</Typography>
              </Box>
            )}
            { relationDI == 0 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Relacion DI: Deudas mayores que el 50% del ingreso mensual</Typography>
              </Box>
            )}
            { savingCapacity == 5 && (
              <Box display="flex" alignItems="row" mb={1}>
                <CheckCircleOutlineSharpIcon style={{ color: 'green', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Capacidad de ahorro: Aprobada</Typography>
              </Box>
            )}
            { (savingCapacity == 3 || savingCapacity == 4) && (
              <Box display="flex" alignItems="row" mb={1}>
                <RemoveRedEyeSharpIcon style={{ color: 'yellow', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Capacidad de ahorro: Moderada</Typography>
              </Box>
            )}
            { savingCapacity < 3  && (
              <Box display="flex" alignItems="row" mb={1}>
                <CancelSharpIcon style={{ color: 'red', marginRight: 8 }} />
                <Typography style={{ color:"#2d2d29" }}>Capacidad de ahorro: Rechazada</Typography>
              </Box>
            )} 
            <FormControl fullWidth>
            <TextField
              id="interest"
              label="Interes"
              value={interest}
              type="number"
              variant="standard"
              onChange={(e) => setInterest(e.target.value)}
              helperText="Porcentaje de interes (%)"
            />
            </FormControl>

            <h3 style={{ color:"#2d2d29" }}> Caracteristicas del cliente  </h3>

            <FormControl fullWidth>
            <TextField
              id="monthlyEntry"
              label="Ingreso mensual"
              value={monthlyEntry}
              type="number"
              variant="standard"
              onChange={(e) => setMonthlyEntry(e.target.value)}
              helperText="Moneda local (CLP)"
            />
            </FormControl>

            <FormControl fullWidth>
            <TextField
              id="allDebts"
              label="Deudas totales al mes"
              value={allDebts}
              type="number"
              variant="standard"
              onChange={(e) => setAllDebts(e.target.value)}
              helperText="Moneda local (CLP)"
            />
            </FormControl>

            <FormControl fullWidth>
            <TextField
              id="monthlyDebts"
              label="Monto mensual depositado"  
              value={monthlyDeposit}
              type="number"
              variant="standard"
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              helperText="Moneda local (CLP)"
            />
            </FormControl>

            <FormControl fullWidth>
            <TextField
              id="topRetirement"
              label="Monto maximo de retiro"  
              value={topRetirement}
              type="number"
              variant="standard"
              onChange={(e) => setTopRetirement(e.target.value)}
              helperText="Moneda local (CLP). En los ultimos 6 meses."
            />
            </FormControl>

            <div>
              <Box>
              <Tooltip title="El usuario hizo retiros de mas del 50% de su saldo o su saldo acumulado quedo en cero" arrow>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.greatRetirement}
                      onChange={handleChange}
                      name="greatRetirement"
                    />
                  }
                  label="Retiros significativos o saldo cero"
                />
              </Tooltip>
              </Box>
              <Box>
              <Tooltip title="El usuario realiza depositos en periodos regulares ya sean trimestrales o mensuales" arrow>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.periodicDeposits}
                      onChange={handleChange}
                      name="periodicDeposits"
                    />
                  }
                  label="Depositos periodicos"
                />
              </Tooltip>
              </Box>
            </div>

            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => ev3(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<CalculateIcon />}
              >
                Calcular CI
              </Button>
    
            </FormControl>

            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => ev4(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<CalculateIcon />}
              >
                Calcular DI
              </Button>
    
            </FormControl>
            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => ev6(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<SavingsSharpIcon />}
              >
                Evaluar capacidad de ahorro
              </Button>
    
            </FormControl>

            <h3 > Razones crediticias </h3>

            <FormControl fullWidth>
            <TextField
              id="creditReason"
              label="Indicaciones"  
              value={creditReason}
              type="text"
              variant="standard"
              onChange={(e) => setCreditReason(e.target.value)}
              helperText="Si se planea rechazar el credito indique los motivo."
              multiline
              rows={4} 
            />
            </FormControl>
    
          </form>
          <br />
        </Box>
        <br />
        <Box>
          <form>
            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => handleClickOpen1(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<DoneAllSharpIcon />}
              >
                Aprobar
              </Button>
    
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => handleClickOpen2(e)}
                sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<CloseSharpIcon />}
              >
                Rechazar
              </Button>
            </FormControl>
            </form>
          </Box>
          <br />
          <Link to="/user/credits" className="link">Volver a la lista</Link>
      </div>
    );

  } else if (executive && creditInit.creditPhase == 5){ 

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <h3 style={{ color:"#2d2d29" }}> Datos del credito </h3>
        <form>
          <p style={{ color:"#2d2d29" }}> Monto solicitado: ${creditRequestedAmount} (CLP) </p>
          <p style={{ color:"#2d2d29" }}> Plazo: {creditTerm} </p>
          {creditType== 1 && (
            <p style={{ color:"#2d2d29" }}> Tipo de credito: Primera vivienda </p>
          )}
          {creditType== 2 && (
            <p style={{ color:"#2d2d29" }}> Tipo de credito: Segunda vivienda </p>
          )}
          {creditType== 3 && (
            <p style={{ color:"#2d2d29" }}> Tipo de credito: Propiedad comercial </p>
          )}
          {creditType== 4 && (
            <p style={{ color:"#2d2d29" }}> Tipo de credito: Remodelacion </p>
          )}
          
          <p style={{ color:"#2d2d29" }}>Etapa: Preparacion de documentacion </p>
          
          <Dialog
        open={open5}
        onClose={handleCancel5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ marginLeft: "4rem" }}>{"Agenda firma de contrato"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ marginLeft: "3rem" }}>
            Selecciona una fecha para agendar.
          </DialogContentText>
          <FormControl fullWidth>
        <Calendar
          onChange={handleDateChange}
          value={creditFirmDate}
          minDate={today}
          tileDisabled={({ date }) => isWeekend(date)}
          style={{ alignItems: "center" }}
        />
      </FormControl>
      <p style={{ color: "#2d2d29" }}>
        Fecha seleccionada:{" "}
        {creditFirmDate
          ? creditFirmDate.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Ninguna"}
      </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel5} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Button
              variant="contained"
              color="info"
              onClick={(e) => handleClickOpen5(e)}
              sx={{
                  marginLeft: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
              startIcon={<HistoryEduIcon />}
            >
              Asignar Fecha de Firma
            </Button>
          <br />
          <Typography variant="h6" component="div" sx={{ color:"#2d2d29", marginTop: "0.4rem" }}>
        Archivo PDF
      </Typography>
          <FormControl fullWidth style={{ marginTop: 16 }}>
            <Button 
              variant="contained" 
              component="label"
              size="small"
              sx={{
                marginLeft: "0.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#215a6d",
                "&:hover": {
                  backgroundColor: "#173d4d", 
                },
              }}
              alignItems="center"
            >
              Contrato crediticio 
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileChange1}
            />
            </Button>
            {selectedFile1 && (
              <p>Archivo seleccionado: {selectedFile1.name}</p>
          )}
          </FormControl>
          <Dialog
        open={open6}
        onClose={handleCancel6}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se confirmara la fecha y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel6} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm6} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
          <FormControl>
            <br />
  
            <Button
              variant="contained"
              color="info"
              onClick={(e) => handleClickOpen6(e)}
              sx={{
                  marginLeft: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
              startIcon={<HistoryEduIcon />}
            >
              Enviar contrato
            </Button>
          </FormControl>
        </form>
        <br />
        <Link to="/user/credits" className="link">Volver a la lista</Link>
      </Box>
    );

  } else if(!executive && creditInit.creditPhase == 6){ 

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <h3 style={{ color: "#2d2d29" }}> Datos del credito </h3>
        <form>
          <p style={{ color: "#2d2d29" }}> Monto solicitado: ${creditRequestedAmount} (CLP) </p>
          <p style={{ color: "#2d2d29" }}> Plazo: {creditTerm} </p>
          <p style={{ color: "#2d2d29" }}> Etapa: Lista para desembolso </p>
          <p style={{ color: "#2d2d29" }}> Fecha de firma: {creditInit.creditFirmDate} </p>
          <Button
              variant="contained"
              color="info"
              onClick={(e) => downloadContract(e)}
              sx={{
                  marginLeft: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                startIcon={<SimCardDownloadIcon/>}
            >
              Descarga de contrato
            </Button>
          <br />
          <Dialog
        open={open7}
        onClose={handleCancel7}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se confirmara la fecha y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel7} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm7} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
          <FormControl>
            <br />
  
            <Button
              variant="contained"
              color="info"
              onClick={(e) => handleClickOpen7(e)}
              sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
              startIcon={<EventIcon />}
            >
              Aceptar fecha
            </Button>
          </FormControl>
          <Dialog
        open={open8}
        onClose={handleCancel8}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se rechazara y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel8} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm8} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
          <FormControl>
            <br />
  
            <Button
              variant="contained"
              color="info"
              onClick={(e) => handleClickOpen8(e)}
              sx={{
                  marginLeft: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
              startIcon={<CloseSharpIcon />}
            >
              Cancelar Solicitud
            </Button>
          </FormControl>
        </form>
        <br />
        <Link to="/user/credits" className="link">Volver a la lista</Link>
      </Box>
    );

  } else if(executive && creditInit.creditPhase == 9){ 

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <h3 style={{ color: "#2d2d29" }}> Datos del credito </h3>
        <form>
          <p style={{ color: "#2d2d29" }}> Monto solicitado: ${creditRequestedAmount} (CLP) </p>
          <p style={{ color: "#2d2d29" }}> Plazo: {creditTerm} </p>
          <p style={{ color: "#2d2d29" }}> Etapa: En desembolso </p>
  
          <br />
          
          <FormControl>
            <br />

            <Dialog
        open={open9}
        onClose={handleCancel9}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se transferiran los fondos y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel9} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm9} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
            <Button
              variant="contained"
              color="info"
              onClick={(e) => handleClickOpen9(e)}
              sx={{
                  marginLeft: "0.5rem",
                  marginBottom: "0.5rem", 
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
              startIcon={<AccountBalanceWalletIcon />}
            >
              Transferir fondos
            </Button>
          </FormControl>
        </form>
        <br />
        <Link to="/user/credits" className="link">Volver a la lista</Link>
      </Box>
    );
  } else if(!executive && creditInit.creditPhase == 0){ 

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <h3 style={{ color: "#2d2d29" }}> Datos del credito </h3>
        <form>
          <p style={{ color: "#2d2d29" }}> Monto solicitado: ${creditRequestedAmount} (CLP) </p>
          <p style={{ color: "#2d2d29" }}> Plazo: {creditTerm} años</p>
          <p style={{ color: "#2d2d29" }}> Etapa: Transferida </p>
  
        </form>
        <br />
        <Link to="/user/credits" className="link">Volver a la lista</Link>
      </Box>
    ); 
  } else {

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        style={{ color:"#2d2d29" }}
      >
        <Dialog
        open={open3}
        onClose={handleCancel3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se tomará como confirmado y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel3} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm3} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open4}
        onClose={handleCancel4}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Quieres proceder con esta acción? Si aceptas, se tomará como rechazado y no se podra revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel4} color="secondary">
            Rechazar
          </Button>
          <Button onClick={handleConfirm4} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
        <h3 style={{ color: "#2d2d29" }}> Datos del credito </h3>
        <form>
          <p style={{ color: "#2d2d29" }}> Monto solicitado: ${creditRequestedAmount} (CLP) </p>
          <p style={{ color: "#2d2d29" }}> Plazo: {creditTerm} </p>
          {creditType== 1 && (
            <p style={{ color: "#2d2d29" }}> Tipo de credito: Primera vivienda </p>
          )}
          {creditType== 2 && (
            <p style={{ color: "#2d2d29" }}> Tipo de credito: Segunda vivienda </p>
          )}
          {creditType== 3 && (
            <p style={{ color: "#2d2d29" }}> Tipo de credito: Propiedad comercial </p>
          )}
          {creditType== 4 && (
            <p style={{ color: "#2d2d29" }}> Tipo de credito: Remodelacion </p>
          )}
          {creditInit.creditPhase == 3 && (
            <p style={{ color: "#2d2d29" }}>Etapa: En evaluacion </p>
          )}
          {creditInit.creditPhase == 4 && (
            <div>
              <p style={{ color: "#2d2d29" }}>Etapa: Pre-aprobada </p>
              <p style={{ color: "#2d2d29" }}>Cargo administrativo: ${creditInit.creditRequestedAmount*0.01} (CLP)</p>
              <p style={{ color: "#2d2d29" }}>Propuesta de cuota mensual: ${creditInit.creditProposedAmount} (CLP)</p>
              <Tooltip title="Total de cuotas mensuales en conjunto del cargo administrativo" arrow>
                <p style={{ color: "#2d2d29" }}>Propuesta de monto final: ${(creditInit.creditProposedAmount*12*creditInit.creditTerm)+creditInit.creditRequestedAmount*0.01} (CLP)</p>
              </Tooltip>
              <FormControl>
                <br />
  
                <Button
                  variant="contained"
                  color="info"
                  onClick={(e) => handleClickOpen3(e)}
                  sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                  startIcon={<DoneAllSharpIcon />}
                >
                  Aceptar propuesta
                </Button>
              </FormControl>
              <FormControl>
                <br />
  
                <Button
                  variant="contained"
                  color="info"
                  onClick={(e) => handleClickOpen4(e)}
                  sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                  startIcon={<CloseSharpIcon />}
                >
                Rechazar propuesta 
                </Button>
              </FormControl>
            </div>
          )}
          {creditInit.creditPhase == 5 && (
            <p style={{ color: "#2d2d29" }}>Etapa: Preparacion de documentacion </p>
          )}
          {creditInit.creditPhase == 6 && (
            <p style={{ color: "#2d2d29" }}>Etapa: Lista para desembolso</p>
          )}
          {creditInit.creditPhase == 7 && (
            <div>
              <p style={{ color: "#2d2d29" }}>Etapa: Rechazada </p>
              <p style={{ color: "#2d2d29" }}>Indicaciones: </p>
              <Box display="flex" alignItems="row" mb={1}>
                <Typography>{creditReason}</Typography>
              </Box>
              <FormControl>
                <br />
  
                <Button
                  variant="contained"
                  color="info"
                  onClick={(e) => cancel(e)}
                  sx={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#215a6d",
                  "&:hover": {
                    backgroundColor: "#173d4d", 
                  },
                }}
                  startIcon={<CloseSharpIcon />}
                >
                Cancelar Solicitud
                </Button>
              </FormControl>
            </div>
            
          )}
          {creditInit.creditPhase == 9 && (
            <p style={{ color: "#2d2d29" }} >Etapa: En desembolso </p>
          )}
          <br />
        </form>
        <br />
        <Link to="/user/credits" className="link">Volver a la lista</Link>
      </Box>
    );
  }
};

export default CreditEvaluation;