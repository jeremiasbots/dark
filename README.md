# Dark v3.1

This project is Dark v3.1, all configuration is in `docker-compose.yaml`,
there you have to change the environment variables (except those that reference MongoDB [{MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGODB}, don't do it if you don't know how to use that database], it will still work) so that the bot starts correctly, this bot is very old and may have bad practices as well as very outdated things but it still works perfectly in 2024.

Use `docker compose up`, ([install Docker first](https://platzi.com/tutorials/1204-docker-architecture/1779-how-to-install-docker-on-windows-and-mac/)) to run this bot

The database has a volume and will always be saved even if the containers are shut down using Ctrl+C, use `docker compose down` to be able to remove the containers.

You can see different tutorials to be able to extract each of the environment variables (Discord TOKEN and others).

If you have any questions, please notify me through my Discord (devep#2622) or my server (https://discord.gg/N3kGxGTW7p).

(Newbie update coming soon, created by devep#2622/jeremiasbots)

Please read the LICENSE.md to see the terms of use for this program.

---

Este proyecto es Dark v3.1, toda la configuración se encuentra en `docker-compose.yaml`,
ahí tiene que cambiar las variables de entorno (excepto las que referencien a MongoDB [{MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGODB}, no lo haga si no sabe usar esa base de datos], de todas formas funcionará) para que el bot inicie correctamente, este bot es muy antiguo y puede tener malas prácticas además de cosas muy desactualizadas pero sigue en perfecto funcionamiento en 2024.

Use `docker compose up` ([instale Docker primero](https://platzi.com/tutoriales/1204-arquitectura-docker/1779-como-instalar-docker-en-windows-y-mac/)) para correr este bot

La base de datos tiene un volumen y siempre será guardada aunque se apaguen los contenedores usando Ctrl+C, use `docker compose down` para poder eliminar los contenedores.

Puede ver distintos tutoriales para poder sacar cada una de las variables de entorno (TOKEN de Discord y demás).

Cualquier duda notificarla a través de mi Discord (devep#2622) o de mi servidor (https://discord.gg/N3kGxGTW7p).

(Pronto actualización para principiantes, creado por devep#2622/jeremiasbots)

Lea la LICENSE.md para que vea las condiciones de uso de este programa.
