"use client";
import React from "react";
import Image from "next/image";
import logoTitle from "../../../public/icons/logoTitle.svg";
import closeNav from "../../../public/icons/closeNav.svg";
import "./SuccessModal.css";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div
        className="success-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <Image src={closeNav} alt="close" width={24} height={24} />
        </button>

        <div className="modal-body">
          <div className="logo-wrapper">
            <Image src={logoTitle} alt="Dilpur Logo" width={188} height={40} />
          </div>

          <h1 className="success-title">3AKA3 ОФОРМЛЕН</h1>

          <p className="success-subtitle">
            Наш менеджер скоро свяжется с вами <br />
            по указанному номеру телефона
          </p>

          <button className="return-home-btn" onClick={onClose}>
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}
