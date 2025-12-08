import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSteps } from "../../../../context/StepContext";
import styles from "../../../../styles/Movimentacoes.module.css";

const Movimentacoes = ({ steps = [] }) => {
  const { setSteps } = useSteps();

  useEffect(() => {
    if (steps.length > 0) {
      setSteps(steps);
    }
  }, [steps]);

  return (
    <div className={styles.formLayout}>
      <div className={styles.formBody}>
        <Outlet />
      </div>
    </div>
  );
};

export default Movimentacoes;