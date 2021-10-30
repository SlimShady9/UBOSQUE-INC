import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '@/pages/Home'

export default function App() {
  return (
    <Router>
      <main className='grid place-items-center max-w-5xl h-screen mx-auto px-2 sm:px-4 lg:px-0'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </main>
    </Router>
  )
}
