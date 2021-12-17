const Hobbit = require("./hobbits-model")
const database = require("../../data/dbConfig")

beforeAll(async () => {
  await database.migrate.rollback()
  await database.migrate.latest()
})
beforeEach(async () => {
  await database.seed.run()
})
afterAll(async () => {
  await database.destroy()
})

describe("hobbits model", () => {
  describe("getAll", () => {
    let result
    beforeEach(async () => {
      result = await Hobbit.getAll()
    })
    it("resolves all hobbits in h table", async () => {
      expect(result).toHaveLength(4)
    })
  })
  describe("getById", () => {
    it("resolves a hobbit with given id, name", async () => {
      const result = await Hobbit.getById(1)
      expect(result).toMatchObject({ id: 1, name: "sam" })
    })
  })
  describe("insert", () => {
    it("creates a new hobbit in db", async () => {
      await Hobbit.insert({ name: "bilbo" })
      const [bilbo] = await database("hobbits").where("id", 5)
      expect(bilbo).toMatchObject({ id: 5, name: "bilbo" })    })
    it("resolves the new hobbit with id, name", async () => {
      const result = await Hobbit.insert({ name: "bilbo" })
      expect(result).toMatchObject({ id: 5, name: "bilbo" })
    })
  })
})
