const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
  // const { title, owner } = request.query;

  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };

  projects.push(project); // esse push joga a criaçao do nosso projeto para o nosso array

  return response.json(project); // sempre retornar o projeto recem criado e nunca exibir a lista completa
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params; // aqui pegamos nosso ID
  const { title, owner } = request.body; //retornando uma nova informação

  //aqui usamos o findIndex para percorrer todo o array atrás do id
  //findIndex vai percorrer todos os projetos, e toda vez que ele percorrer na variável PROJECT
  //caso ela seja satisfeita e retorne TRUE, ela vai retornar o id que estou passando (project=> project.id ===id)
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Projeto não encontrado' });
  }

  //agora que tenho indice , vou criar uma nova informação do projeto
  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const {id} = request.params

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Projeto não encontrado' });
  }

  projects.splice(projectIndex, 1);

  return response.json(204).send();
});

//console.log(app);

app.listen(3000);
