const Ship = require('./ship')

beforeEach(() => {
    // Reset the static id before each test
    Ship.id = 0;
});

test('creates a ship with 4 hp', () => {
    const myShip = new Ship(4);

    expect(myShip).toEqual({
        hp: 4,
        id: 0,
        sunk: false,
        hitsTaken: 0,
    });

    expect(myShip).toHaveProperty('hp', 4)
})

test('hit the ship two times, causing it to be sunk the second time', () => {
    const myShip = new Ship(2);
    expect(myShip.hitsTaken).toBe(0);
    expect(myShip.sunk).toBe(false);

    // Simulate hitting the ship
    myShip.hits();
    expect(myShip.hitsTaken).toBe(1);
    expect(myShip.sunk).toBe(false); // Ship is not sunk yet

    // Hit the ship until it sinks
    myShip.hits();
    expect(myShip.hitsTaken).toBe(2);
    expect(myShip.sunk).toBe(true)
})

test('check ship IDs', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    expect(ship1.id).toBe(0);
    expect(ship2.id).toBe(1);
})