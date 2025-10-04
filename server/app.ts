import { RouterContextProvider } from 'react-router';
import { createRequestHandler } from '@react-router/express';
import express from 'express';
import { mockData, mockRecentActivity } from './mock-data';
// Dashboard data provider
const dashboardDataProvider = {
    getOrganizations: () => mockData,
    getRecentActivity: () => mockRecentActivity,
};

declare module 'react-router' {
    interface RouterContextProvider {
        VALUE_FROM_EXPRESS: string;
        dashboardData: typeof dashboardDataProvider;
    }
}
const loadContext = {
    VALUE_FROM_EXPRESS: 'Hello from Express',
    dashboardData: dashboardDataProvider,
};
export const app = express();

app.use(
    createRequestHandler({
        build: () => import('virtual:react-router/server-build'),
        getLoadContext() {
            const context = new RouterContextProvider();
            Object.assign(context, loadContext);
            return context;
        },
    })
);
