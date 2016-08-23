import usersData from './dataset';

export function addLike(input) {
  const person = usersData.find(user => user.id == input.personId);
  if (person) {
    person.like++;
  }
  return { person, clientMutationId: input.clientMutationId };
}

export function getPerson(id) {
  return usersData.find(user => user.id === id);
}

export function getPeople(offset, count) {
  return usersData.map(user => user)
    .slice(offset, count + offset);
}

export function getStudents(offset, count) {
  return usersData.map(user => user)
    .filter(person => person.role.indexOf('student') > -1)
    .slice(offset, count + offset);
}

export function getStudent(id) {
  return getPerson(id);
}

export function getPrincipals(offset, count) {
  return usersData.map(user => user)
    .filter(person => person.role.indexOf('principal') > -1)
    .slice(offset, count + offset);
}

export function getPrincipal(id) {
  return getPerson(id);
}

export function getTeachers(offset, count) {
  return usersData.map(user => user)
    .filter(person => person.role.indexOf('teacher') > -1)
    .slice(offset, count + offset);
}

export function getTeacher(id) {
  return getPerson(id);
}
