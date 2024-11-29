export const WORLD = {
  ORIGIN: [0, 0, 0],
  GROUND_SIZE: 30,
  ZONES: {
    PUBLIC: {
      POSITION: [0, 0, 5],
      SIZE: [20, 0.1, 10]
    },
    PRIVATE: {
      POSITION: [0, 0, -5],
      SIZE: [20, 0.1, 10]
    }
  },
  GATE: {
    POSITION: [0, 2, 0],
    FRAME: {
      PILLAR_SIZE: [8, 4, 1],
      PILLAR_OFFSET: 6,
      ARCH_SIZE: [7, 0.5, 1],
      ARCH_HEIGHT: 1.5
    },
    BARRIER: {
      SIZE: [4, 3, 0.1],
      COLLIDER: [2, 1.5, 0.05]
    }
  },
  PLAYER: {
    START_POSITION: [0, 0.5, 5], // Player spawn point in public zone
    SIZE: [1, 1, 1],
    CAMERA: {
      HEIGHT: 2,
      DISTANCE: 6,
      TILT: 30
    }
  }
}