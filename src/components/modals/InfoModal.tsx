import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../root'
import { closeDialog } from '../../store/actions/dialogs'
import { MajarraButton } from '../button'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'


export function InfoModal() {

    const isOpen = useSelector((state: RootState) => state.dialogs.info);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeDialog({ dialogName: 'info' })), []);

    return (
        <BaseModal title="كيفية اللعب" isOpen={isOpen} handleClose={handleClose}>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {'خمن الكلمة المطلوبة في ست محاولات، بعد كل تخمين ستتلون الأحرف لتعكس مدى صحة التخمين'}
            </p>


            <p className="text-sm text-gray-500 dark:text-gray-300">
                {'الحرف (م) موجود في الكلمة المطلوبة وفي مكانه الصحيح'}
            </p>
            <div className="flex justify-center mb-4 mt-1">
                <Cell value="م" status="correct" />
                <Cell value="ق" />
                <Cell value="ا" />
                <Cell value="ل" />
                <Cell value="ة" />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300">
                {'الحرف (ا) موجود في الكلمة المطلوبة لكنه موجود في غير موضعه'}
            </p>
            <div className="flex justify-center mb-4 mt-1">
                <Cell value="م" />
                <Cell value="ن" />
                <Cell value="ا" status="present" />
                <Cell value="ر" />
                <Cell value="ة" />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300">
                {'الحرف (م) غير موجود في الكلمة'}
            </p>
            <div className="flex justify-center mb-4 mt-1">
                <Cell value="ا" />
                <Cell value="ل" />
                <Cell value="ش" />
                <Cell value="م" status="absent" />
                <Cell value="س" />
            </div>

            <div className="w-[250px] mx-auto my-5">
                <MajarraButton
                    onClick={handleClose}
                    variant="contained"
                    className="h-[40px]"
                    fullWidth>
                    {'ابدأ اللعب الآن'}
                </MajarraButton>
            </div>

            <div
                className="flex justify-center align-center pt-4 py-2"
            >
                <p className="text-black">
                    {`Copyright © ${new Date().getFullYear()} Majarra`}
                </p>
            </div>
        </BaseModal>
    )
}
