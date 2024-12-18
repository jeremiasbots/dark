FROM oven/bun:latest

RUN mkdir -p /home/app
COPY . /home/app

WORKDIR /home/app
EXPOSE 5000
RUN bun i
CMD ["bun", "start"]