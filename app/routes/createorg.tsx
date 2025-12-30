import { Form } from 'react-router';
import Header from '@/components/header';
import { mapTextColor } from '@/utils/colors';

export default function createOrg() {
    return (
        <div className={`bg-primary ${mapTextColor('primary')} flex min-h-screen flex-col font-sans`}>
            <Header />

            <div className="container-padding-x flex flex-1 flex-col items-center justify-center gap-y-8">
                <Form method="post" className="bg-secondary flex w-full flex-col justify-center gap-y-2 rounded-xl p-4 md:max-w-3/4 md:gap-y-6 md:px-6 md:py-6">
                    <h1 className="text-2xl">Create New Organisation</h1>
                    <div className="flex flex-col gap-y-4 py-2 text-lg md:gap-y-8">
                        {/* Project Title */}
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                            <label htmlFor="ProjectTitle" className="w-full font-medium text-gray-700 md:w-1/3">
                                Project Title
                            </label>
                            <input
                                id="ProjectTitle"
                                name="ProjectTitle"
                                type="text"
                                placeholder="Enter project title"
                                className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-2/3"
                            />
                        </div>

                        {/* Project Summary */}
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
                            <label htmlFor="ProjectSummary" className="w-full font-medium text-gray-700 md:w-1/3">
                                Project Summary
                            </label>
                            <textarea
                                id="ProjectSummary"
                                name="ProjectSummary"
                                placeholder="Enter project summary"
                                className="h-24 w-full resize-none rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-2/3"
                            />
                        </div>

                        {/* Lead Person */}
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                            <label htmlFor="LeadPerson" className="w-full font-medium text-gray-700 md:w-1/3">
                                Lead Person
                            </label>
                            <input
                                id="LeadPerson"
                                name="LeadPerson"
                                type="text"
                                placeholder="Enter lead person name"
                                className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-2/3"
                            />
                        </div>

                        {/* Team Members */}
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                            <label htmlFor="TeamMembers" className="w-full font-medium text-gray-700 md:w-1/3">
                                Team Members
                            </label>
                            <div className="flex w-full gap-2 md:w-2/3">
                                <input
                                    id="TeamMembers"
                                    name="TeamMembers"
                                    type="text"
                                    placeholder="Add member emails"
                                    className="flex-1 rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <button type="button" className="w-12 rounded-xl border-2 border-gray-300 text-gray-700 transition hover:bg-blue-500 hover:text-white">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-4">
                            <button type="button" className="rounded-xl border-2 border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-200">
                                Back
                            </button>
                            <button type="submit" className="rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-green-600">
                                Register Project
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
