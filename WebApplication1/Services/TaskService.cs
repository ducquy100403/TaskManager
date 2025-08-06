using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class TaskService
    {
        private readonly ITaskRepository _repo;
        public TaskService(ITaskRepository repo) => _repo = repo;

        public Task<List<TaskItem>> GetAllTasks() => _repo.GetAllAsync();
        public Task<TaskItem> GetTask(int id) => _repo.GetByIdAsync(id);
        public Task<TaskItem> AddTask(TaskItem task) => _repo.AddAsync(task);
        public async Task ToggleTask(int id)
        {
            var task = await _repo.GetByIdAsync(id);
            if (task != null)
            {
                task.IsCompleted = !task.IsCompleted;
                await _repo.UpdateAsync(task);
            }
        }
        public Task DeleteTask(int id) => _repo.DeleteAsync(id);
    }
}
