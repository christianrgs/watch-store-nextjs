import type { TAppServer } from '../server'
/*
 * Mirage JS guide on Seeds: https://miragejs.com/docs/data-layer/factories#in-development
 */

const productsSeeder = (server: TAppServer) => {
  server.createList('product', 24)
}

export default function seeds(server: TAppServer) {
  productsSeeder(server)
}
