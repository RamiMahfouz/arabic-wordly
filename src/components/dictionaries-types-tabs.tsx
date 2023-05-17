import classnames from 'classnames'
import { Tab } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import {
    DocumentTextIcon,
} from '@heroicons/react/outline'
import { dictionaryTypeTranslater } from '../constants/strings'




export function ChangeDictionaryTabs() {
    return (
        <div className="hidden flex justify-center items-center my-4 md:flex">

            <DocumentTextIcon className="ml-2 h-7 w-7" />

            <h1 className="text-xl font-bold">{'نوع الكلمات'}</h1>

            <Tab.Group>
                <Tab.List className="box-border mx-10 flex items-center ">
                    {['main', 'adjactives', 'nouns', 'names', 'verbs'].map((_type) => (
                        <NavLink
                            to={`/${_type === 'main' ? '' : _type}`}
                            key={_type}
                            className={({ isActive }) =>
                                classnames('text-[#777] border-b-2 border-slate-200', {
                                    'text-[#5a13a0] border-b-2 border-[#5a13a0]': isActive,
                                })
                            }
                        >
                            {({ isActive }) => (
                                <Tab
                                    className={classnames('px-3', {
                                        'text-[#5a13a0]': isActive,
                                    })}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    <p className="py-2">
                                        {dictionaryTypeTranslater(_type as any)}
                                    </p>
                                </Tab>
                            )}
                        </NavLink>
                    ))}
                </Tab.List>
            </Tab.Group>
        </div>
    )
}
