// React component for routing and layout
import React from 'react'; import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; import Layout from './components/Layout/Layout'; import Dashboard from './pages/Dashboard'; import PropertyDetails from './pages/PropertyDetails'; const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/property/:id' component={PropertyDetails} />
                </Switch>
            </Layout>
        </Router>
    );
};
export default App;