import Link from 'next/link';
import Calculator from './components/Calculator/Calculator';
import styles from './calculatorPage.module.scss';

const CalculatorPage = () => {
    return (
        <div className={styles.root}> 
          <button className="d-none">
            <Link href="/">  
              <a className="text-green">Back to home</a>
            </Link>
          </button>
          <Calculator />
        </div>
    )
}
export default CalculatorPage;