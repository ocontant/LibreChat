import React, { useState, useRef } from 'react';
import CheckMark from '../svg/CheckMark.jsx';
import useOnClickOutside from '~/hooks/useOnClickOutside.js';
import { Listbox, Transition } from '@headlessui/react';
import { Wrench } from 'lucide-react';
import { cn } from '~/utils/';

function SelectDropDown({
  title = 'Plugins',
  value,
  disabled,
  setValue,
  availableValues,
  showAbove = false,
  showLabel = true,
  containerClassName,
  isSelected,
  className
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setIsOpen(false));
  const handleSelect = value => {
    setValue(value);
    setIsOpen(true);
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', containerClassName)}>
      <div className="relative w-full">
        <Listbox
          value={value}
          onChange={handleSelect}
          disabled={disabled}
        >
          {() => (
            <>
              <Listbox.Button
                className={cn(
                  'relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 dark:border-white/20 dark:bg-gray-800 sm:text-sm',
                  className
                )}
                onClick={() => setIsOpen(!isOpen)}
                open={isOpen}
              >
                {' '}
                {showLabel && (
                  <Listbox.Label
                    className="block text-xs text-gray-700 dark:text-gray-500"
                    id="headlessui-listbox-label-:r1:"
                    data-headlessui-state=""
                  >
                    {title}
                  </Listbox.Label>
                )}
                <span className="inline-flex w-full truncate">
                  <span
                    className={cn(
                      'flex h-6 items-center gap-1 truncate text-sm text-gray-900 dark:text-white',
                      !showLabel ? 'text-xs' : ''
                    )}
                  >
                    {!showLabel && title.length > 0 && (
                      <span className="text-xs text-gray-700 dark:text-gray-500">{title}:</span>
                    )}
                    <span className="flex h-6 items-center gap-1 truncate">
                      <div className="flex gap-1">
                        {value.map((v, i) => (
                          <div
                            key={i}
                            className="relative"
                            style={{ width: '16px', height: '16px' }}
                          >
                            {v.icon ? (
                              <img
                                key={i}
                                src={v.icon}
                                alt={`${v} logo`}
                                className="h-full w-full rounded-sm bg-white"
                              />
                            ) : (
                              <Wrench
                                key={i}
                                className="h-full w-full rounded-sm bg-white"
                              />
                            )}
                            <div
                              key={i}
                              className="absolute inset-0 rounded-sm ring-1 ring-inset ring-black/10"
                            />
                          </div>
                        ))}
                      </div>
                    </span>
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4  text-gray-400"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={showAbove ? { transform: 'scaleY(-1)' } : {}}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </Listbox.Button>
              <Transition
                show={isOpen}
                as={React.Fragment}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className={showAbove ? 'bottom-full mb-3' : 'top-full mt-3'}
              >
                <Listbox.Options
                  ref={menuRef}
                  className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded bg-white text-base text-xs ring-1 ring-black/10 focus:outline-none dark:bg-gray-800 dark:ring-white/20 dark:last:border-0 md:w-[100%]"
                >
                  {availableValues.map((option, i) => {
                    const selected = isSelected(option.value);
                    return (
                      <Listbox.Option
                        key={i}
                        value={option.value}
                        className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="h-6 w-6 shrink-0">
                            <div
                              className="relative"
                              style={{ width: '100%', height: '100%' }}
                            >
                              {option.icon ? (
                                <img
                                  src={option.icon}
                                  alt={`${option} logo`}
                                  className="h-full w-full rounded-sm bg-white"
                                />
                              ) : (
                                <Wrench className="h-full w-full rounded-sm bg-white" />
                              )}
                              <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-black/10"></div>
                            </div>
                          </span>
                          <span
                            className={cn(
                              'flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100',
                              selected ? 'font-semibold' : ''
                            )}
                          >
                            {option.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 dark:text-gray-100">
                              <CheckMark />
                            </span>
                          )}
                        </span>
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}

export default SelectDropDown;
