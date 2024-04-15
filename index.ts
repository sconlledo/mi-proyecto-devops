import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

function suma(a: number, b: number): number {
  try {
    return a + b;
  } catch (error) {
    throw error;
  }
}

function resta(a: number, b: number): number {
  try {
    return a - b;
  } catch (error) {
    throw error;
  }
}

function multiplicacion(a: number, b: number): number {
  return a * b;
}

function division(a: number, b: number): number {
  if (b === 0) {
    throw new Error("No se puede dividir por cero.");
  }
  return a / b;
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hola mundo");
});

app.post("/calcular", (req: Request, res: Response) => {
  try {
    const { operacion, a, b } = req.body;

    if (isNaN(Number(a)) || isNaN(Number(b))) {
      throw new Error("Los parametros deben ser numeros");
    }

    let resultado = 0;
    switch (operacion) {
      case "add":
        resultado = suma(Number(a), Number(b));
        break;
      case "min":
        resultado = resta(Number(a), Number(b));
        break;
      case "multi":
        resultado = multiplicacion(Number(a), Number(b));
        break;
      case "div":
        resultado = division(Number(a), Number(b));
        break;
      default:
        throw new Error("La operacion no es valida");
    }

    res.status(200).send({ resultado });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
