/**
 * @file src/components/DropdownMultiSelect/DropdownMultiSelect.tsx
 * @author leon.wang
 */

import React, { useMemo, useState, useEffect } from 'react';
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
  language?: 'zh' | 'en';
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
  language = 'zh',
  className,
  disabled,
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

  const handleDraftChange = (nextValue) => {
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

  const displayedValue = useMemo(() => {
    return open ? draftValue : selectedValue;
  }, [draftValue, open, selectedValue]);

  return (
    <div className={classNames('dropdown-multi-select', className)}>
      <Select
        mode="multiple"
        open={open}
        onOpenChange={handleOpenChange}
        value={displayedValue}
        options={options}
        disabled={disabled}
        maxTagCount={0}
        maxTagPlaceholder={(omittedValues) =>
          language === 'en'
            ? `${omittedValues.length} selected`
            : `已选中 ${omittedValues.length} 项`
        }
        placeholder={language === 'zh' ? '请选择' : 'Please select'}
        onChange={handleDraftChange}
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
                {language === 'zh' ? '应用' : 'Apply'}
              </Button>

              <Checkbox
                type="link"
                size="small"
                checked={isAllSelected}
                onClick={handleToggleAll}
              >
                {language === 'zh' ? '全选' : 'Select All'}
              </Checkbox>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DropdownMultiSelect;
