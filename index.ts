import {IPersonData} from './src/interfaces/person.interface';
import {Person} from './src/person/person.class';
import {PersonCollection} from './src/person/person.collection';

const personsData: IPersonData[] = [
    {name: 'Vladlen', age: 25},
    {name: 'Elena', age: 17},
    {name: 'Ivan', age: 18},
    {name: 'Igor', age: 14},
    {name: 'Lisa', age: 32},
    {name: 'Irina', age: 23},
    {name: 'Oleg', age: 20},
];

const persons: Person[] = personsData.map((people: IPersonData): Person => new Person(people));
const pc: PersonCollection = new PersonCollection(persons);
// pc.showName();

// Показать имена и возвраст всех, затем только имена для 18+
pc
.call((people: Person) => { console.log(`${people.getName()} - ${people.age}`)} )
.filter((people: Person) => people.age >= 18)
.showName();

// Тоже самое, без урезания коллекции
pc
.call((people: Person) => { console.log(`${people.getName()} - ${people.age}`)} )
.call({
    filter: ((people: Person) => people.age >= 18),
    call: (people: Person) => { people.showName(); },
});
