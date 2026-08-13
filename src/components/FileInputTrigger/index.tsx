/* eslint-disable react/prop-types */
/**
 * @file src/components/FileInputTrigger/index.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import React, { useImperativeHandle } from 'react';
import classNames from 'classnames';
import './index.scss';

const baseClassName = 'file-input-trigger';

type Props = {
    onChange: (files: FileList) => void;
    style?: React.CSSProperties;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    capture?: string;
    children?: React.ReactNode;
    className?: string;
};

/**
 * FileInputTrigger
 * @description A wrapper component of file input. It returns the origin file input element and you can use ref to get the element.
 * @param {Props} props
 * @prop {Function} onChange callback when file changed
 * @prop {boolean} [disabled=false] whether the file input is disabled
 * @prop {boolean} [multiple=false] whether the file input accepts multiple files
 * @prop {string} [accept] the accept of file input
 * @prop {string} [capture] the capture of file input
 * @prop {ReactNode} [children] the children of file input
 * @prop {string} [className] the className of file input
 * @returns {React.ReactElement}
 */
const FileInputTrigger: React.FC<Props> = React.forwardRef((props, ref) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const {
        onChange,
        disabled,
        multiple,
        accept,
        children,
        className,
        ...rest
    } = props;

    useImperativeHandle(ref, () => inputRef.current);

    return (
        <div
            {...rest}
            onClick={() => {
                inputRef.current.value = '';
                inputRef.current.click();
            }}
            className={classNames(baseClassName, className, {
                disabled: disabled,
            })}
        >
            <input
                style={{ display: 'none' }}
                type="file"
                ref={inputRef}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target.files && typeof onChange === 'function') {
                        onChange(e.target.files);
                    }
                }}
            />
            {children}
        </div>
    );
});

FileInputTrigger.displayName = 'FileInputTrigger';

export default FileInputTrigger;
