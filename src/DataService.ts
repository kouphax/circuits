export type CircuitSynopsis = {
  id: number;
  title: string;
  subtitle: string;
};

export type Circuits = {
  circuits: CircuitSynopsis[];
};

export type Exercise = {
  id: ExerciseId;
  name: string;
  target: string;
  image: string;
};

export type ExerciseId = string;

export type Circuit = {
  id: number;
  exercise: Exercise;
  duration: number;
};

export type CircuitWorkout = {
  id: number;
  title: string;
  subtitle: string;
  circuit: Circuit[];
  rests: {
    exercise: number;
    circuit: number;
  };
  circuits: number;
};

export type CircuitDefinition = {
  id: number;
  eid: ExerciseId;
  duration: number;
};

export type CircuitWorkoutDefinition = CircuitSynopsis & {
  circuit: CircuitDefinition[];
  rests: {
    exercise: number;
    circuit: number;
  };
  circuits: number;
};

export class DataService {
  static circuits(): Circuits {
    const circuits: CircuitSynopsis[] = require("./data/circuits.json");
    return {
      circuits
    };
  }

  static circuit(id: number): CircuitWorkout {
    const definition: CircuitWorkoutDefinition = require(`./data/circuits/${id}.json`);
    return {
      id: definition.id,
      title: definition.title,
      subtitle: definition.subtitle,
      rests: definition.rests,
      circuits: definition.circuits,
      circuit: definition.circuit.map(circuit => {
        const exercise: Exercise = require(`./data/exercises/${circuit.eid}.json`);
        return {
          id: circuit.id,
          exercise,
          duration: circuit.duration
        }
      })
    }
  }
}
