import { NavLink } from 'react-router-dom'
import { BaseModal } from './BaseModal'
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../root';
import { closeDialog } from '../../store/actions/dialogs';
import { MajarraButton } from '../button';
import { dictionaryTypeTranslater } from '../../constants/strings';


const translations = {
    TITLE: 'نوع الكلمات',
    DESCRIPTION: 'يمكنك تغيير نوع القاموس المستخدم ضمن اللعبة',

}

const types = ['main', 'adjactives', 'nouns', 'names', 'verbs']



export function DictionaryModal() {

    const isOpen = useSelector((state: RootState) => state.dialogs.dictionaries);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeDialog({ dialogName: 'dictionaries' })), []);

    return (
        <BaseModal title={translations.TITLE} isOpen={isOpen} handleClose={handleClose}>


            <div>

                <p className="mb-7">
                    {translations.DESCRIPTION}
                </p>

                <div className="flex flex-wrap justify-center">
                    {
                        types.map(type => (
                            <div
                                key={type}
                            >
                                <NavLink
                                    to={`/${type === 'main' ? '' : type}`}
                                    className="block mx-2 my-2"
                                >
                                    {
                                        ({ isActive }) => (
                                            isActive ?
                                                <MajarraButton className="px-4 py-2" variant="contained">
                                                    {dictionaryTypeTranslater(type as any)}
                                                </MajarraButton>
                                                :
                                                <button
                                                    className="text-[#595A5B] border-2 border-[#959697] rounded-lg  px-3 py-1"
                                                >
                                                    {dictionaryTypeTranslater(type as any)}
                                                </button>
                                        )
                                    }

                                </NavLink>
                            </div>
                        ))
                    }
                </div>




            </div>

        </BaseModal>
    )
}
