import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const data = {
        title: 'Test Title',
        genres: ['test genre 1', 'test genre 2'],
        year: 2000,
      };
      service.create(data);
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const data = {
        title: 'Test Title',
        genres: ['test genre 1', 'test genre 2'],
        year: 2000,
      };
      service.create(data);
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll();
      expect(beforeCreate.length).toEqual(0);
      const data = {
        title: 'Test Title',
        genres: ['test genre 1', 'test genre 2'],
        year: 2000,
      };
      service.create(data);
      const afterCreate = service.getAll();
      expect(afterCreate[0].title).toEqual('Test Title');
      expect(afterCreate[0].genres.length).toEqual(2);
      expect(afterCreate[0].year).toEqual(2000);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const data = {
        title: 'Test Title',
        genres: ['test genre 1', 'test genre 2'],
        year: 2000,
      };
      service.create(data);

      service.update(1, { title: 'Updated Test Title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test Title');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });
});
