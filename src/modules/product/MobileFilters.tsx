"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import closeIcon from "@/../public/icons/XBlack.svg";
import arrowIcon from "@/../public/icons/arrowBottomBlack.svg";
import checkbox from "@/../public/icons/checkbox.svg";
import checkboxActive from "@/../public/icons/checkboxActive.svg";

import { sizeT } from "@/types/product";
import { useGlobalState } from "@/store/globalState";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  category: sizeT[];
  size: sizeT[];
  optionSort: { label: string; value: string }[];
}

export default function MobileFilters({
  isOpen,
  onClose,
  category,
  size,
  optionSort,
}: MobileFiltersProps) {
  const { setClearSearch, setSearchArr, searchArr } = useGlobalState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [localTypes, setLocalTypes] = useState<string[]>([]);
  const [localCategorys, setLocalCategorys] = useState<string[]>([]);
  const [localSizes, setLocalSizes] = useState<string[]>([]);
  const [localSort, setLocalSort] = useState<string>("");

  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    season: true,
    size: true,
  });

  useEffect(() => {
    if (isOpen) {
      setLocalTypes(searchParams.getAll("types"));
      setLocalCategorys(searchParams.getAll("categorys"));
      setLocalSizes(searchParams.getAll("sizes"));
      setLocalSort(searchParams.get("sorts") || "");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, searchParams]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToggle = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(value)) {
      setState(state.filter((i) => i !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete("types");
    localTypes.forEach(t => params.append("types", t));
    
    params.delete("categorys");
    localCategorys.forEach(c => params.append("categorys", c));
    
    params.delete("sizes");
    localSizes.forEach(s => params.append("sizes", s));
    
    if (localSort) {
      params.set("sorts", localSort);
    } else {
      params.delete("sorts");
    }

    // Synchronize global searchArr
    setClearSearch(); // Clear all and URL (but we push new URL after)
    
    localTypes.forEach(t => setSearchArr({ key: "types", value: t }));
    localCategorys.forEach(c => setSearchArr({ key: "categorys", value: c }));
    localSizes.forEach(s => setSearchArr({ key: "sizes", value: s }));
    if (localSort) setSearchArr({ key: "sorts", value: localSort });

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    setLocalTypes([]);
    setLocalCategorys([]);
    setLocalSizes([]);
    setLocalSort("");
  };

  if (!isOpen) return null;

  return (
    <div className={`mobile-filters-overlay ${isOpen ? "active" : ""}`}>
      <div className="mobile-filters-container">
        <div className="mobile-filters-header">
          <button className="close-btn" onClick={onClose}>
            <Image src={closeIcon} alt="close" width={24} height={24} />
          </button>
          <h2>ФИЛЬТРЫ И СОРТИРОВКА</h2>
          <div style={{ width: 24 }}></div> {/* Placeholder for centering */}
        </div>

        <div className="mobile-filters-content">
          {/* Sorting Section */}
          <div className="filter-section">
            <div className="section-header" onClick={() => toggleSection("sort")}>
              <span>Сортировка</span>
              <Image 
                src={arrowIcon} 
                alt="arrow" 
                className={expandedSections.sort ? "rotate" : ""} 
              />
            </div>
            {expandedSections.sort && (
              <div className="section-content">
                {optionSort.map((opt) => (
                  <div 
                    key={opt.value} 
                    className="filter-item"
                    onClick={() => setLocalSort(opt.value)}
                  >
                    <Image 
                      src={localSort === opt.value ? checkboxActive : checkbox} 
                      alt="checkbox" 
                    />
                    <span className="label">{opt.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Season (Category) Section */}
          <div className="filter-section">
            <div className="section-header" onClick={() => toggleSection("season")}>
              <span>Сезон</span>
              <Image 
                src={arrowIcon} 
                alt="arrow" 
                className={expandedSections.season ? "rotate" : ""} 
              />
            </div>
            {expandedSections.season && (
              <div className="section-content">
                {category.map((cat) => (
                  <div 
                    key={cat.id} 
                    className="filter-item"
                    onClick={() => handleToggle(String(cat.id), localCategorys, setLocalCategorys)}
                  >
                    <Image 
                      src={localCategorys.includes(String(cat.id)) ? checkboxActive : checkbox} 
                      alt="checkbox" 
                    />
                    <span className="label">{cat.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Size Section */}
          <div className="filter-section">
            <div className="section-header" onClick={() => toggleSection("size")}>
              <span>Размер</span>
              <Image 
                src={arrowIcon} 
                alt="arrow" 
                className={expandedSections.size ? "rotate" : ""} 
              />
            </div>
            {expandedSections.size && (
              <div className="section-content grid">
                {size.map((s) => (
                  <div 
                    key={s.id} 
                    className={`size-item ${localSizes.includes(String(s.id)) ? "active" : ""}`}
                    onClick={() => handleToggle(String(s.id), localSizes, setLocalSizes)}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mobile-filters-footer">
          <button className="reset-btn" onClick={handleReset}>СБРОСИТЬ</button>
          <button className="apply-btn" onClick={handleApply}>ПРИНЯТЬ</button>
        </div>
      </div>
    </div>
  );
}
