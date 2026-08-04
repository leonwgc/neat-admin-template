/**
 * @file useFormValidStatus.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useState, useEffect } from 'react';
import { Form } from '@derbysoft/neat-design';
import { useLatest } from 'ahooks';

/**
 * Custom React hook to determine the validity status of a form.
 *
 * This hook observes the form's values and runs validation logic whenever the values change.
 * It supports both built-in form validation and an optional custom validator function.
 * The validity check can be delayed by a specified amount of milliseconds.
 *
 * @param form - The form instance to validate.
 * @param validator - Optional custom validation function that receives the form values and returns a boolean indicating validity.
 * @param delay - Optional delay (in milliseconds) before running the validation logic. Defaults to 0.
 * @returns A boolean indicating whether the form is valid (`true`), invalid (`false`), or `undefined` if validation has not yet run.
 */
const useFormValidStatus = (
    form,
    validator?: (values: { [p: string]: any }) => boolean,
    delay = 0,
) => {
    const [formValid, setFormValid] = useState<boolean>();
    const values = Form.useWatch([], form);
    const formRef = useLatest(form);
    const validatorRef = useLatest(validator);

    useEffect(() => {
        setTimeout(() => {
            formRef.current
                ?.validateFields({ validateOnly: true })
                .then(() => {
                    if (
                        !validatorRef.current ||
                        (typeof validatorRef.current === 'function' &&
                            validatorRef.current(values))
                    ) {
                        setFormValid(true);
                    } else {
                        setFormValid(false);
                    }
                })
                .catch(({ errorFields = [] }) => {
                    if (errorFields.length) {
                        setFormValid(false);
                    }
                });
        }, delay);
    }, [formRef, validatorRef, values, delay]);

    return formValid;
};

export default useFormValidStatus;
