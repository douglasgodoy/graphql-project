import { faker } from "@faker-js/faker";

export const fullNameGenerator = () =>
  `${faker.name.firstName()} ${faker.name.lastName()}`;

export const ageGenerator = () => Math.floor(Math.random() * (18 - 60)) + 60;
