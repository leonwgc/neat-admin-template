/**
 * @file src/components/DropdownMultiSelect/DropdownMultiSelect.tsx
 * @author leon.wang
 */

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Select, Button, Divider, Checkbox } from '@derbysoft/neat-design';
import classNames from 'classnames';
import './DropdownMultiSelect.scss';

export interface DropdownMultiSelectOption {
  /** Option label */
  label: string;
  /** Option unique value */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface DropdownMultiSelectProps {
  /** Selected values (controlled mode) */
  value?: string[];
  /** Initial selected values (uncontrolled mode) */
  defaultValue?: string[];
  /** Select options */
  options: DropdownMultiSelectOption[];
  /** Selection change callback */
  onChange?: (value: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Component class name */
  className?: string;
  /** Disable interaction */
  disabled?: boolean;
  /** Minimum width of dropdown popup */
  popupMinWidth?: number;
  style?: React.CSSProperties;
}

/**
 * DropdownMultiSelect
 *
 * Multi-select dropdown with draft selection, select-all and apply action.
 */
const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = ({
  value,
  defaultValue = [],
  options,
  onChange,
  placeholder = '请选择',
  className,
  disabled,
  style,
}) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string[]>(defaultValue);
  const [draftValue, setDraftValue] = useState<string[]>(
    isControlled ? value || [] : innerValue,
  );
  const [open, setOpen] = useState(false);

  const selectedValue = isControlled ? value || [] : innerValue;

  useEffect(() => {
    if (isControlled) {
      setDraftValue(value || []);
    }
  }, [isControlled, value]);

  const enabledValues = useMemo(
    () => options.filter((item) => !item.disabled).map((item) => item.value),
    [options],
  );

  const isAllSelected = useMemo(() => {
    if (enabledValues.length === 0) return false;
    return enabledValues.every((item) => draftValue.includes(item));
  }, [draftValue, enabledValues]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setDraftValue(selectedValue);
      return;
    }

    setDraftValue(selectedValue);
  };

  const handleDraftChange = (nextValue: string[]) => {
    setDraftValue(nextValue);
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setDraftValue([]);
      return;
    }
    setDraftValue(enabledValues);
  };

  const handleApply = () => {
    const nextValue = [...draftValue];

    if (!isControlled) {
      setInnerValue(nextValue);
    }

    onChange?.(nextValue);
    setOpen(false);
  };

  // const tagRender = useCallback(
  //   (props) => {
  //     const v = (open ? draftValue : selectedValue).map((item) => {
  //       const option = options.find((o) => o.value === item);
  //       return option?.label || item;
  //     });

  //     return (
  //       <span className="dropdown-multi-select__tag">
  //         <span className="dropdown-multi-select__tag-text">
  //           {v.join(', ')}
  //         </span>
  //         &nbsp;
  //       </span>
  //     );
  //   },
  //   [draftValue, open, options, selectedValue],
  // );

  return (
    <div className={classNames('dropdown-multi-select', className)}>
      <Select
        mode="multiple"
        open={open}
        onOpenChange={handleOpenChange}
        value={open ? draftValue : selectedValue}
        options={options}
        disabled={disabled}
        maxTagCount="responsive"
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={handleDraftChange}
        closable={false}
        tagRender={(props) => {
          const { label } = props;
          return <span className="tag-text">{label}</span>;
        }}
        popupRender={(menu) => (
          <div className="dropdown-multi-select__dropdown">
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <div className="dropdown-multi-select__actions">
              <Button
                type="primary"
                size="small"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleApply}
              >
                应用
              </Button>

              <Checkbox
                type="link"
                size="small"
                checked={isAllSelected}
                onClick={handleToggleAll}
              >
                全选
              </Checkbox>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DropdownMultiSelect;
