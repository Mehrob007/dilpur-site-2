"use client";
import React from "react";
import Image from "next/image";
import logoTitle from "../../../public/icons/logoTitle.svg";
import closeNav from "../../../public/icons/closeNav.svg";
import "./ErrorModal.css";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorCode?: string | number;
}

export default function ErrorModal({
  isOpen,
  onClose,
  errorCode,
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="error-modal-overlay" onClick={onClose}>
      <div
        className="error-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <Image src={closeNav} alt="close" width={24} height={24} />
        </button>

        <div className="modal-body">
          <div className="logo-wrapper">
            <Image src={logoTitle} alt="Dilpur Logo" width={188} height={40} />
          </div>

          <h1 className="error-title">ОШИБКА ОФОРМЛЕНИЯ</h1>

          <p className="error-subtitle">
            Произошла ошибка при оформлении заказа. <br />
            {errorCode && (
              <span className="error-code">Код ошибки: {errorCode}</span>
            )}
            <br />
            Пожалуйста, попробуйте позже.
          </p>

          <button className="retry-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
