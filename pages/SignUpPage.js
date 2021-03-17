import Link from 'next/link'

const SignUpPage = () => {
    return (
        <div>
          <h1>Sign Up Page</h1>
          <h2>
            <Link href="/">  
              <a className="text-green">Back to home</a>
            </Link>
          </h2>
        </div>
    )
}
export default SignUpPage;