import { Form } from 'react-router';
import Header from '~/shared-components/headers';
import { mapTextColor } from '~/utils/colors';

export default function createOrg() {
    return (
        <div className={`bg-primary ${mapTextColor('primary')} font-sans min-h-screen flex flex-col`}>
            <Header pageType="" />

            <div className="flex flex-col flex-1 items-center justify-center gap-y-8 container-padding-x">
                <Form method="post" className="w-full p-4 md:px-6 md:py-6 md:max-w-3/4 flex flex-col justify-center gap-y-2 md:gap-y-6 bg-secondary rounded-xl">
                    <h1 className="text-2xl">Create New Organisation</h1>
                    <div className="text-lg flex flex-col py-2 gap-y-4 md:gap-y-8">
                        <div className="flex flex-col md:flex-row justify-between px-2 sm:px-4 gap-y-2 md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgName">
                                Organization Name
                            </label>
                            <input name="OrgName" type="text" className="flex-1 border-2 border-black w-full px-2 rounded-xl" />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between px-2 sm:px-4 gap-y-2 md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgDescription">
                                Organization Description
                            </label>
                            <textarea name="OrgDescription" className="border-2 border-black w-full px-2 flex-1 rounded-xl" />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between px-2 sm:px-4 gap-y-2 md:gap-y-0">
                            <label className="flex-1" htmlFor="UserRole">
                                Your Role
                            </label>
                            <input name="UserRole" type="text" className="flex-1 border-2 border-black w-full px-2 rounded-xl" />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between px-2 sm:px-4 gap-y-2 md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgMembers">
                                Initial Members
                            </label>
                            <div className="flex-1 flex gap-x-1">
                                <input name="OrgMembers" type="text" className="flex-1 border-2 border-black w-full px-2 rounded-xl " />
                                <button className="flex-0 border-2 border-black p-2 leading-0 rounded-2xl w-3/4">+</button>
                            </div>
                        </div>

                        <div className="flex items-center flex-row flex-wrap justify-between px-2 sm:px-4 gap-y-2 md:gap-y-0 pt-2">
                            <button className="border-2 border-black  px-2 rounded-2xl ">Cancel</button>
                            <button className="border-2 border-black  px-2 rounded-2xl">Create Organization</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
