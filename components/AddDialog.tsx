import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Field } from './Field';

// interface Field {
//   key: string;
//   label: string;
//   type: 'text' | 'number' | 'date';
//   required?: boolean;
// }

interface AddDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
  fields: Field[];
  title?: string;
}

const AddDialog: React.FC<AddDialogProps> = ({ visible, onClose, onSubmit, fields, title }) => {
  const [form, setForm] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm({});
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.dialogBox}>
          <Text style={styles.title}>{title || 'Add Item'}</Text>
          {fields.map(field => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.label}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                value={form[field.key] ?? ''}
                onChangeText={text => handleChange(field.key, text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          ))}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  cancelBtn: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 16,
  },
  cancelText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddDialog;
