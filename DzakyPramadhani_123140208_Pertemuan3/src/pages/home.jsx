function HomePage() {
  const { books } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const openAddModal = () => {
    setBookToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookToEdit(null);
  };

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Book Library</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Book
        </button>
      </div>

      <Controls />

      {/* Book Grid */}
      {books.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onEdit={() => openEditModal(book)}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-700">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No books match your current filters, or your library is empty.
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={bookToEdit ? 'Edit Book' : 'Add New Book'}
      >
        <BookForm
          bookToEdit={bookToEdit}
          onDone={closeModal}
        />
      </Modal>
    </div>
  );
}

export default HomePage;