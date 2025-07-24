import React, { useEffect, useState } from 'react';
import SectionForm from './SectionForm';
import Modal from '../../components/Modal';
import type { Brand, Section } from '../../types/section';
import { deleteSection, getBrands, getSections } from '../../services/sections';

const PAGE_SIZE = 10;

const SectionsPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Section | undefined>(undefined);

  const fetchSections = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getSections(filter, 1000);
      let sections: Section[] = res.data.data ?? [];
      sections = sections.sort((a: Section, b: Section) => Number(b.id) - Number(a.id));
      setSections(sections);
      setPage(1);
    } catch {
      setError('Error al cargar secciones');
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands().then(res => {
      setBrands(res.data.data ?? []);
    });
  }, []);

  useEffect(() => {
    fetchSections();
    // eslint-disable-next-line
  }, [filter]);

  const sectionsToShow = sections.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro de eliminar esta sección?')) return;
    try {
      await deleteSection(id);
      fetchSections();
    } catch {
      alert('Error al eliminar');
    }
  };

  const handleEdit = (section: Section) => {
    setEditing(section);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditing(undefined);
    setShowForm(true);
  };

  useEffect(() => {
    if ((page - 1) * PAGE_SIZE >= sections.length) {
      setPage(1);
    }
    // eslint-disable-next-line
  }, [sections]);

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-50 via-cyan-50 to-blue-100 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,179,237,0.13),transparent_60%)] pointer-events-none" />
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-[2.5px] shadow-2xl border border-blue-100 rounded-[2.5rem] px-12 py-9 relative">
          <div className="sticky top-0 z-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 bg-white/90 backdrop-blur-[2px] rounded-t-[2.5rem]">
            <div>
              <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight mb-1 flex items-center gap-2 select-none">
                <svg className="w-9 h-9 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <rect x="3.5" y="4.5" width="17" height="15" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10.5h8M8 14h5" />
                </svg>
                Secciones
              </h2>
              <span className="text-base text-blue-400/90 font-medium">Administra las categorías de productos de cada franquicia</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <input
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filtrar por nombre"
                className="border border-blue-200 px-5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 transition-all w-60 text-base"
              />
              <button
                onClick={fetchSections}
                className="bg-blue-50 text-blue-700 px-6 py-2 rounded-xl hover:bg-blue-100 font-semibold shadow-sm transition text-base"
              >
                Buscar
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-gradient-to-tr from-blue-500 to-cyan-400 text-white px-8 py-2.5 rounded-2xl font-bold shadow-xl hover:from-blue-600 hover:to-cyan-500 transition-all text-base"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                Nueva sección
              </button>
            </div>
          </div>
          {loading && <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}
          {error && <p className="text-red-600 font-bold my-4">{error}</p>}
          <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white/80 shadow mt-2">
            <table className="min-w-full text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
                  <th className="py-4 px-6 text-left font-semibold rounded-tl-2xl">Nombre</th>
                  <th className="py-4 px-6 text-left font-semibold">Marca</th>
                  <th className="py-4 px-6 text-left font-semibold">Estado</th>
                  <th className="py-4 px-6 text-left font-semibold rounded-tr-2xl">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sectionsToShow.map(sec => (
                  <tr
                    key={sec.id}
                    className="border-b last:border-0 hover:bg-blue-50/80 transition group"
                  >
                    <td className="py-4 px-6 font-medium text-blue-900">{sec.name}</td>
                    <td className="py-4 px-6">{sec.brand?.name}</td>
                    <td className="py-4 px-6">
                      <span className={
                        sec.status?.id === 'A'
                          ? 'inline-flex items-center bg-green-50 text-green-700 font-semibold px-4 py-1.5 rounded-full shadow-sm'
                          : 'inline-flex items-center bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full'
                      }>
                        {sec.status?.id === 'A' ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Activo
                          </>
                        ) : "Inactivo"}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex gap-2">
                      <button
                        onClick={() => handleEdit(sec)}
                        className="bg-yellow-300/80 text-yellow-900 px-5 py-1.5 rounded-xl font-semibold shadow hover:bg-yellow-200 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(sec.id!)}
                        className="bg-red-500/90 text-white px-5 py-1.5 rounded-xl font-semibold shadow hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {sectionsToShow.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-blue-400/70 font-medium text-xl">Sin resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex gap-3 items-center justify-center">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-2 border border-blue-200 rounded-full disabled:opacity-50 bg-white hover:bg-blue-50 font-medium text-blue-700 shadow transition"
            >
              Anterior
            </button>
            <span className="text-blue-800 font-bold text-lg tracking-wider select-none">Página {page}</span>
            <button
              disabled={page * PAGE_SIZE >= sections.length}
              onClick={() => setPage(page + 1)}
              className="px-6 py-2 border border-blue-200 rounded-full disabled:opacity-50 bg-white hover:bg-blue-50 font-medium text-blue-700 shadow transition"
            >
              Siguiente
            </button>
          </div>
        </div>
        <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? "Editar sección" : "Nueva sección"}>
          <SectionForm
            brands={brands}
            initial={editing}
            onSuccess={() => {
              setShowForm(false);
              fetchSections();
              setPage(1);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SectionsPage;
