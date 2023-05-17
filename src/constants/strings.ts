import {DICTIONARY_TYPES} from "./wordlist"

export const GAME_TITLE = 'كلمات'

export const WIN_MESSAGES = ['أحسنت', 'رائع', 'نجحت']
export const GAME_COPIED_MESSAGE = 'تم نسخ نتائج اللعبة'
export const ABOUT_GAME_MESSAGE = 'عن اللعبة'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'عدد الحروف غير كافي'
export const SAME_WORD_ENTERED_BEFORE = 'لقد قمت بإدخال هذه الكلمة سابقاً'
export const WORD_NOT_FOUND_MESSAGE = 'الكلمة غير موجودة بالقاموس'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `الكلمة المطلوبة هي: ${solution}`
export const ENTER_TEXT = 'جرّب الحل'
export const DELETE_TEXT = 'حذف'
export const STATISTICS_TITLE = 'إحصائيات اللعبة'
export const GUESS_DISTRIBUTION_TEXT = 'التوزيع الإحصائي'
export const NEW_WORD_TEXT = 'ستكون الكلمة التالية متاحة بعد:'
export const SHARE_TEXT = 'مشاركة'
export const TOTAL_TRIES_TEXT = 'عدد المحاولات الكلية'
export const SUCCESS_RATE_TEXT = 'معدّل النجاح'
export const CURRENT_STREAK_TEXT = 'مرّات النجاح على التوالي'
export const BEST_STREAK_TEXT = 'أفضل تسلسل للنجاح'



export function dictionaryTypeTranslater(dicType: DICTIONARY_TYPES) {
    switch (dicType) {
        case 'verbs':
            return 'الأفعال'

        case 'adjactives':
            return 'الصفات'

        case 'nouns':
            return 'أسماء'

        case 'names':
            return 'أسماء علم'

        case 'main':
            return 'الجميع'
    }
}
