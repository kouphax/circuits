import {Circuit, CircuitWorkout, DataService} from "../DataService";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, ProgressBar } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { set } from "local-storage";

type Plan = { name: string, duration: number}[][]

type CircuitTimerState = {
    time: number,
    paused: boolean
    nextAction: "START" | "PAUSED"
    plan: Plan
    currentCircuit: number,
    currentExercise: number,
    complete: boolean
    currentPlanTime: number
    totalPlanTime: number
}

const beep = () => new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=").play()

const buildPlan = (circuit: CircuitWorkout) => {
    const plan: Plan = []
    for (let index = 0; index < circuit.circuits; index++) {
        plan[index] = []
        for (let exerciseIndex = 0; exerciseIndex < circuit.circuit.length; exerciseIndex++) {
            const currentCircuit: Circuit = circuit.circuit[exerciseIndex]
            plan[index].push({ name: currentCircuit.exercise.name, duration: currentCircuit.duration })
            if(exerciseIndex < circuit.circuit.length - 1) {
                plan[index].push({ name: "Rest", duration: circuit.rests.exercise })
            }
        }
        if(index < circuit.circuits - 1) {
            plan[index].push({ name: "Rest", duration: circuit.rests.circuit })
        }
    }
    return plan
}

const CircuitTimer = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: {
      params: { id }
    }
  } = props;


  const circuit: CircuitWorkout = DataService.circuit(parseInt(id));
  const plan: Plan =  buildPlan(circuit)
    const totalPlanTime = plan.reduce((p, c) => p + c.reduce((p1, c1) => p1 + c1.duration, 0), 0)
  const [state, setState] = useState<CircuitTimerState>({
      time: plan[0][0].duration,
      currentPlanTime: totalPlanTime,
      totalPlanTime,
      plan,
      paused: true,
      nextAction: "START",
      currentCircuit: 0,
      currentExercise: 0,
      complete: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
        if(!state.paused && !state.complete) {
            const exerciseComplete: boolean = state.time <= 1
            const circuitComplete: boolean = exerciseComplete && state.currentExercise === state.plan[state.currentCircuit].length - 1
            const planComplete: boolean = circuitComplete && state.currentCircuit === state.plan.length - 1

            let currentExercise: number
            let currentCircuit: number
            let time: number
            let currentPlanTime: number
            if(planComplete) {
                currentExercise = state.currentExercise
                currentCircuit = state.currentCircuit
                time = 0
                currentPlanTime = 0
                set<boolean>(`@circuit/${circuit.id}`, true)
            } else if(exerciseComplete && circuitComplete) {
                currentExercise = 0
                currentCircuit = state.currentCircuit + 1
                time = plan[currentCircuit][currentExercise].duration
                currentPlanTime = state.currentPlanTime - 1
            } else if(exerciseComplete) {
                currentExercise = state.currentExercise + 1
                currentCircuit = state.currentCircuit
                time = plan[currentCircuit][currentExercise].duration
                currentPlanTime = state.currentPlanTime - 1
                beep()
            } else {
                currentExercise = state.currentExercise
                currentCircuit = state.currentCircuit
                time = state.time - 1
                currentPlanTime = state.currentPlanTime - 1
            }
            
            setState(Object.assign({}, state, {
                time: time,
                currentCircuit,
                currentExercise,
                complete: planComplete,
                currentPlanTime
            }))
        }
    }, 1000);
    return () => clearInterval(interval);
  });

  const toggleTimer = () => {
      if(state.paused) {
          setTimeout(() => {
            setState(Object.assign({}, state, { nextAction: "START (3)" }))
            beep()
            setTimeout(() => {
                setState(Object.assign({}, state, { nextAction: "START (2)" }))
                beep()
                setTimeout(() => {
                    setState(Object.assign({}, state, { nextAction: "START (1)" }))
                    beep()
                    setTimeout(() => {
                        setState(Object.assign({}, state, { paused: false, nextAction: "PAUSE" }))
                    }, 1000)
                    
                }, 1000)
            }, 1000)
          }, 1000)
      } else {
        setState(Object.assign({}, state, { paused: true, nextAction: "START" }))
      }
    
  }
  
  return (
    <>
      <Row className="pl-3 pr-3">
        <Col xs="6" md="12">
          <LinkContainer to={`/circuit/${id}`}>
            <Button block variant="dark" className=" mt-5">
              <span style={{ fontSize: "2em" }}>BACK</span>
            </Button>
          </LinkContainer>
        </Col>
        <Col xs="6" md="12">
          <Button block variant="outline-dark" className="mb-5 mt-5" onClick={ () => toggleTimer() }>
            <span style={{ fontSize: "2em" }}>{ state.nextAction }</span>
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
        <h3 className="text-center text-muted subtitle">Circuit</h3>
        <h4 className="text-center text-muted subtitle">({ Math.floor(state.currentPlanTime / 60) }<small>m</small> { state.currentPlanTime - Math.floor(state.currentPlanTime / 60) * 60 }<small>s</small>)  </h4>
        <ProgressBar variant="info" max={state.totalPlanTime} now={state.currentPlanTime} />
        </Col>
        <Col>
        <h3 className="text-center text-muted subtitle">Exercise</h3>
        <h4 className="text-center text-muted subtitle">({ Math.floor(state.time / 60) }<small>m</small> { state.time - Math.floor(state.time / 60) * 60 }<small>s</small>) </h4>
            <ProgressBar variant="info" max={ state.plan[state.currentCircuit][state.currentExercise].duration } now={state.time} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center display-3 pt-5">{ state.plan[state.currentCircuit][state.currentExercise].name }</h1>
          <h2 className="text-center display-1 text-muted subtitle">{ state.time }</h2>
          <h3 className="text-center text-muted subtitle">
            SECONDS
          </h3>
        </Col>
      </Row>
    </>
  );
};

export default CircuitTimer;
