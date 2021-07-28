import React from 'react';
import { TagInput } from './TagInput';
import { Button } from '../../../shared/components/Button'
import './index.scss';

export function Editor(props) {
  return (
    <div className="modal">
      <div className="content">
        <div className="header-text">
          <h2>Package song editor</h2>
          <p>You're editing:</p>
        </div>
        <div className="entries">
          <TagInput placeholder="Cover" name="cover"/>
          <TagInput placeholder="Title" name="title"/>
          <TagInput placeholder="Artist" name="artist"/>
          <TagInput placeholder="Album" name="album"/>
        </div>
        <div className="grouped-btns">
          <Button
            className="cancel-edit"
            label="Cancel"
          />
          <Button
            className="save-edit"
            label="Save edition"
          />
        </div>
        <i class="uil uil-times-circle"/>        
      </div>
    </div>
  );
};