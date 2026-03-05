import './App.css'
import { Show , SignInButton , SignUpButton , UserButton } from '@clerk/react'
function App() {

  return (
    <>
      <header>
        <h1>Welcome to the app</h1>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
