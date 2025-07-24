import React, { useState } from 'react';
import type { Brand, Section } from '../../types/section';
import { createSection, updateSection } from '../../services/sections';

interface Props {
  brands: Brand[];
  initial?: Section;
  onSuccess: () => void;
}

const SectionForm: React.FC<Props> = ({ brands, initial, onSuccess }) => {
  const [name, setName] = useState(initial?.name || '');
  const [brand, setBrand] = useState(initial?.brand.id || '');
  const [status, setStatus] = useState(initial?.status.id || 'A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const section: Section = {
      ...(initial?.id ? { categoryId: initial.id } : {}),
      name,
      brand: { id: brand },
      status: { id: status },
      channels: [],
    };
    try {
      if (initial) {
        await updateSection(section);
      } else {
        await createSection(section);
      }
      onSuccess();
    } catch {
      setError('Error guardando sección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
        required
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={brand}
        onChange={e => setBrand(e.target.value)}
        required
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione marca</option>
        {brands.map(b => (
          <option value={b.abbreviatedName} key={b.id}>{b.name}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        required
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="A">Activo</option>
        <option value="I">Inactivo</option>
      </select>
      {error && <span className="text-red-600">{error}</span>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default SectionForm;
