console.log('hola grecia te amo!');

import express from 'express';
const app = express();
const port = 3000;
   let personas= [{id: 1, nombre: 'Grecia', edad: 19},
    {id: 2, nombre: 'Lourdes', edad: 18},
  ];
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ejemplo de API REST');
});

app.get('/personas', (req, res) => {
  res.json(personas);
});
app.get('/personas/:id', (req, res) => {
  const persona = personas.find(p => p.id ==req.params.id)
  persona ? res.json(persona) : res.status(404).send('Persona no encontrada');
});

app.post('/personas', (req, res) => {
  console.log(req.body);
  const nuevoid= personas.length + 1;
  const nuevaPersona = {id: nuevoid,
    nombre: req.body.nombre,
    edad: req.body.edad
  };
  personas.push(nuevaPersona);
  res.status(201).json(nuevaPersona);
});

app.put('/personas', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const persona = personas.find(p => p.id ==req.query.id)
  if(!persona){
    return res.status(404).send('Persona no encontrada');
  }
  persona.nombre = req.body.nombre;
  persona.edad = req.body.edad;
  res.json(persona);
});

app.delete('/personas/:id', (req, res) => {
  const indice = personas.findIndex(i => i.id == req.params.id);
  if(indice == -1) return res.status(404).send('No existe')
    personas.splice(indice, 1);
    res.status(204).send('Persona eliminada');
});
// Middleware paara url erroneas o inexistentes.
app.use((req, res)=>{
  res.status(404).send('La página no existe');
});
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});